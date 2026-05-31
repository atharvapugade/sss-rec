import AdminNavbar from "@/components/AdminNavbar";
import AdminPaginatedTable from "@/components/AdminPaginatedTable";
import { requireAdminAuth } from "@/lib/adminAuth";
import connectDB from "@/lib/mongodb";
import ServiceEnquiry from "@/models/ServiceEnquiry";

export const dynamic = "force-dynamic";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "countryCode", label: "Country Code" },
  { key: "phone", label: "Number" },
  { key: "service", label: "Service" },
  { key: "method", label: "Hiring Method" },
  { key: "location", label: "Location" },
  { key: "requirement", label: "Extra Requirements" },
  { key: "status", label: "Status" },
];

async function getServiceEnquiries() {
  await connectDB();
  const enquiries = await ServiceEnquiry.find({}).sort({ createdAt: -1 }).lean();

  return enquiries.map((enquiry) => ({
    id: enquiry._id.toString(),
    name: enquiry.name,
    email: enquiry.email,
    countryCode: enquiry.countryCode,
    phone: enquiry.phone,
    service: enquiry.service,
    method: enquiry.method,
    location: enquiry.location,
    requirement: enquiry.requirement || "-",
    status: enquiry.status,
  }));
}

export default async function ServiceEnquiriesPage() {
  await requireAdminAuth();
  const serviceEnquiries = await getServiceEnquiries();

  return (
    <main className="admin-page">
      <AdminNavbar />

      <section className="admin-content">
        <div className="admin-page-head">
          <p>Hiring Requests</p>
          <h1>Service Enquiries</h1>
          <span>Manage hire staff requests submitted from service forms.</span>
        </div>

        <AdminPaginatedTable
          title="Requests"
          totalLabel="total requests"
          columns={columns}
          rows={serviceEnquiries}
          deleteEndpoint="/api/service-enquiries"
        />
      </section>
    </main>
  );
}
