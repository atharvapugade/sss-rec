"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaChartLine, FaEnvelopeOpenText, FaSignOutAlt, FaUserCog } from "react-icons/fa";

const adminLinks = [
  { href: "/admin-7c2b6a/dashboard", label: "Dashboard", icon: <FaChartLine /> },
  {
    href: "/admin-7c2b6a/contact-enquiries",
    label: "Contact Enquiries",
    icon: <FaEnvelopeOpenText />,
  },
  {
    href: "/admin-7c2b6a/service-enquiries",
    label: "Service Enquiries",
    icon: <FaUserCog />,
  },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsMenuOpen(false);
    router.push("/admin-7c2b6a");
    router.refresh();
  };

  const renderLinks = (classNamePrefix, onClick) => (
    <>
      {adminLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${classNamePrefix}-link ${
            pathname === link.href ? `${classNamePrefix}-link-active` : ""
          }`}
          onClick={onClick}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}

      <button type="button" className={`${classNamePrefix}-logout`} onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </>
  );

  return (
    <nav className="admin-navbar">
      <Link href="/admin-7c2b6a/dashboard" className="admin-navbar-brand">
        <span>SSS</span>
        <div>
          <strong>Admin Panel</strong>
          <p>SSS Recruitment</p>
        </div>
      </Link>

      <div className="admin-navbar-links">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-navbar-link ${
              pathname === link.href ? "admin-navbar-link-active" : ""
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>

      <button type="button" className="admin-logout-btn" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>

      <button
        type="button"
        className={`admin-menu-toggle ${isMenuOpen ? "is-open" : ""}`}
        aria-label="Toggle admin navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`admin-mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        {renderLinks("admin-mobile", () => setIsMenuOpen(false))}
      </div>
    </nav>
  );
}
