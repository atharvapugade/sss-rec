"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        <button
          type="button"
          className={`site-navbar-toggle ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`site-mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`site-mobile-link ${
                isActive ? "site-mobile-link-active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
