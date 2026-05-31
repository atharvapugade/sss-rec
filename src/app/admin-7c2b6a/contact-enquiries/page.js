import AdminNavbar from "@/components/AdminNavbar";
import AdminPaginatedTable from "@/components/AdminPaginatedTable";
import { requireAdminAuth } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import ContactEnquiry from "@/models/ContactEnquiry";

export const dynamic = "force-dynamic";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "reason", label: "Reason" },
  { key: "message", label: "Message" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
];

async function getContactEnquiries() {
  await connectDB();
  const enquiries = await ContactEnquiry.find({}).sort({ createdAt: -1 }).lean();

  return enquiries.map((enquiry) => ({
    id: enquiry._id.toString(),
    name: enquiry.name,
    email: enquiry.email,
    reason: enquiry.reason,
    message: enquiry.message,
    date: new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    status: enquiry.status,
  }));
}

export default async function ContactEnquiriesPage() {
  await requireAdminAuth();
  const enquiries = await getContactEnquiries();

  return (
    <main className="admin-page">
      <AdminNavbar />

      <section className="admin-content">
        <div className="admin-page-head">
          <p>Inbox</p>
          <h1>Contact Enquiries</h1>
          <span>Track general contact form messages and support requests.</span>
        </div>

        <AdminPaginatedTable
          title="Messages"
          totalLabel="total enquiries"
          columns={columns}
          rows={enquiries}
          deleteEndpoint="/api/contact-enquiries"
        />
      </section>
    </main>
  );
}
