import AdminNavbar from "@/components/AdminNavbar";
import { requireAdminAuth } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import ContactEnquiry from "@/models/ContactEnquiry";
import ServiceEnquiry from "@/models/ServiceEnquiry";
import Visit from "@/models/Visit";
import { FaChartBar, FaEnvelope, FaMousePointer, FaUsers } from "react-icons/fa";

export const dynamic = "force-dynamic";

function getStartOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getStartOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatDateTime(date) {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getWeeklyRanges() {
  const today = getStartOfDay(new Date());

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    return {
      day: date.toLocaleDateString("en-IN", { weekday: "short" }),
      start: date,
      end: nextDate,
    };
  });
}

function getTrendNote(currentCount, previousCount) {
  if (previousCount === 0) {
    return currentCount > 0 ? "New this month" : "No visits yet";
  }

  const change = Math.round(((currentCount - previousCount) / previousCount) * 100);
  const sign = change >= 0 ? "+" : "";

  return `${sign}${change}% this month`;
}

function buildActivities({ contacts, services, visits }) {
  const contactActivities = contacts.map((item) => ({
    time: item.createdAt,
    title: "Contact enquiry",
    text: `${item.name || "A visitor"} sent a ${item.reason || "general"} message.`,
  }));

  const serviceActivities = services.map((item) => ({
    time: item.createdAt,
    title: "Service request",
    text: `${item.name || "A visitor"} requested ${item.service || "staffing support"}.`,
  }));

  const visitActivities = visits.map((item) => ({
    time: item.createdAt,
    title: "Website visit",
    text: `Visitor opened ${item.path || "the website"}.`,
  }));

  return [...contactActivities, ...serviceActivities, ...visitActivities]
    .sort((first, second) => new Date(second.time) - new Date(first.time))
    .slice(0, 5);
}

async function getDashboardData() {
  await connectDB();
  const now = new Date();
  const todayStart = getStartOfDay(now);
  const currentMonthStart = getStartOfMonth(now);
  const previousMonthStart = new Date(
    currentMonthStart.getFullYear(),
    currentMonthStart.getMonth() - 1,
    1
  );
  const weeklyRanges = getWeeklyRanges();

  const [
    totalVisits,
    todayVisits,
    currentMonthVisits,
    previousMonthVisits,
    contactCount,
    serviceCount,
    weeklyCounts,
    recentContacts,
    recentServices,
    recentVisits,
  ] = await Promise.all([
    Visit.countDocuments(),
    Visit.countDocuments({ createdAt: { $gte: todayStart } }),
    Visit.countDocuments({ createdAt: { $gte: currentMonthStart } }),
    Visit.countDocuments({
      createdAt: { $gte: previousMonthStart, $lt: currentMonthStart },
    }),
    ContactEnquiry.countDocuments(),
    ServiceEnquiry.countDocuments(),
    Promise.all(
      weeklyRanges.map((range) =>
        Visit.countDocuments({
          createdAt: { $gte: range.start, $lt: range.end },
        })
      )
    ),
    ContactEnquiry.find({}).sort({ createdAt: -1 }).limit(3).lean(),
    ServiceEnquiry.find({}).sort({ createdAt: -1 }).limit(3).lean(),
    Visit.find({}).sort({ createdAt: -1 }).limit(3).lean(),
  ]);
  const maxWeeklyCount = Math.max(...weeklyCounts, 1);
  const visitBars = weeklyRanges.map((range, index) => ({
    day: range.day,
    count: weeklyCounts[index],
    value: Math.max(weeklyCounts[index] > 0 ? 8 : 3, Math.round((weeklyCounts[index] / maxWeeklyCount) * 100)),
  }));

  const stats = [
    {
      label: "Total Visits",
      value: formatNumber(totalVisits),
      note: getTrendNote(currentMonthVisits, previousMonthVisits),
      icon: <FaUsers />,
    },
    {
      label: "Today Visits",
      value: formatNumber(todayVisits),
      note: "Real public page views",
      icon: <FaMousePointer />,
    },
    { label: "Contact Enquiries", value: contactCount, note: "General messages", icon: <FaEnvelope /> },
    { label: "Service Requests", value: serviceCount, note: "Hire staff enquiries", icon: <FaChartBar /> },
  ];

  return {
    stats,
    visitBars,
    activities: buildActivities({
      contacts: recentContacts,
      services: recentServices,
      visits: recentVisits,
    }),
  };
}

export default async function AdminDashboardPage() {
  await requireAdminAuth();
  const { stats, visitBars, activities } = await getDashboardData();

  return (
    <main className="admin-page">
      <AdminNavbar />

      <section className="admin-content">
        <div className="admin-page-head">
          <p>Analytics Overview</p>
          <h1>Main Dashboard</h1>
          <span>Monitor website performance and enquiry activity.</span>
        </div>

        <div className="admin-stats-grid">
          {stats.map((item) => (
            <article key={item.label} className="admin-stat-card">
              <span>{item.icon}</span>
              <div>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <small>{item.note}</small>
              </div>
            </article>
          ))}
        </div>

        <div className="admin-dashboard-grid">
          <section className="admin-panel-card">
            <div className="admin-panel-head">
              <h2>Weekly Visits</h2>
              <p>Simple analytics style website visits summary.</p>
            </div>

            <div className="admin-chart">
              {visitBars.map((bar) => (
                <div key={bar.day}>
                  <span
                    style={{ height: `${bar.value}%` }}
                    title={`${bar.count} visits`}
                  />
                  <p>{bar.day}</p>
                  <small>{bar.count}</small>
                </div>
              ))}
            </div>
          </section>

          <section className="admin-panel-card">
            <div className="admin-panel-head">
              <h2>Recent Activity</h2>
              <p>Quick admin notes for latest enquiry movement.</p>
            </div>

            <div className="admin-activity-list">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <article key={`${activity.title}-${activity.time}`}>
                    <strong>{activity.title}</strong>
                    <p>{activity.text}</p>
                    <small>{formatDateTime(activity.time)}</small>
                  </article>
                ))
              ) : (
                <article>
                  <strong>No activity yet</strong>
                  <p>New visits and enquiries will appear here automatically.</p>
                </article>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
