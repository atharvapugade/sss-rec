"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="site-navbar">
      <div className="container-custom site-navbar-inner">

        {/* ================= LOGO ================= */}
        <Link href="/" className="site-navbar-logo">
          <div className="site-navbar-mark">
            SSS
          </div>

          <div>
            <p className="site-navbar-title">
              SSS Recruitments
            </p>
            <p className="site-navbar-subtitle">
              Achieve Together
            </p>
          </div>
        </Link>

        {/* ================= NAV LINKS ================= */}
        <div className="site-navbar-links">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link site-navbar-link ${
                  isActive
                    ? "site-navbar-link-active"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
