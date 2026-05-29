import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Receptionist",
  "Babysitter",
  "Cook Services",
  "House Helpers",
];

const socials = [
  { href: "https://www.facebook.com/", label: "Facebook", icon: <FaFacebookF /> },
  { href: "https://www.instagram.com/", label: "Instagram", icon: <FaInstagram /> },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: <FaLinkedinIn /> },
  { href: "https://wa.me/", label: "WhatsApp", icon: <FaWhatsapp /> },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Link href="/" className="site-footer-logo">
              <span className="site-footer-logo-mark">SSS</span>
              <span>
                <span className="site-footer-logo-title">SSS Recruitment</span>
                <span className="site-footer-logo-subtitle">
                  Achieve Together
                </span>
              </span>
            </Link>

            <p className="site-footer-text">
              Trusted staffing support for families, homes, and businesses with
              reliable service and clear communication.
            </p>
          </div>

          <div>
            <h3 className="site-footer-heading">Links</h3>
            <div className="site-footer-list">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="site-footer-heading">Services</h3>
            <div className="site-footer-list">
              {services.map((service) => (
                <Link key={service} href="/services">
                  {service}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="site-footer-heading">Connect</h3>
            <p className="site-footer-text">
              Follow us for updates and staffing support.
            </p>

            <div className="site-footer-socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>&copy; 2026 SSS Recruitment. All rights reserved.</p>
          <Link href="/contact">Contact Support</Link>
        </div>
      </div>
    </footer>
  );
}
