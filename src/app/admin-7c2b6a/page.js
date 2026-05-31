import AdminLoginForm from "@/components/AdminLoginForm";
import { getAdminSession } from "@/lib/adminAuth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin-7c2b6a/dashboard");
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-brand">
          <span>SSS</span>
          <div>
            <p>Secure Admin</p>
            <h1>Welcome Back</h1>
          </div>
        </div>

        <p className="admin-login-text">
          Login to manage website visits, contact enquiries, and service
          requests for SSS Recruitment.
        </p>

        <AdminLoginForm />
      </section>
    </main>
  );
}
