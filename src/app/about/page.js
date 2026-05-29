import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  FaCheckCircle,
  FaHandshake,
  FaHome,
  FaShieldAlt,
  FaUserTie,
} from "react-icons/fa";

const stats = [
  {
    value: "500+",
    label: "Families supported",
    text: "Reliable staffing support for homes and families.",
  },
  {
    value: "4+",
    label: "Staff categories",
    text: "Babysitters, cooks, receptionists, and house helpers.",
  },
  {
    value: "24/7",
    label: "Enquiry support",
    text: "Clear communication and quick next-step guidance.",
  },
];

const values = [
  {
    icon: <FaShieldAlt />,
    title: "Trusted People",
    text: "We focus on dependable staff who understand care, privacy, and responsibility.",
  },
  {
    icon: <FaHandshake />,
    title: "Clear Hiring",
    text: "Simple communication and practical guidance make the hiring process smoother.",
  },
  {
    icon: <FaHome />,
    title: "Home Ready",
    text: "Support for families, homes, and businesses that need reliable daily help.",
  },
];

const process = [
  "Understand your staffing need",
  "Match the right service category",
  "Coordinate details clearly",
  "Support a smooth placement",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <ScrollReveal />

      <main className="about-page">
        <section className="about-hero-v2">
          <div className="about-container">
            <div className="about-hero-copy-v2 about-animate scroll-reveal">
              <p className="about-kicker">About SSS Recruitment</p>
              <h1>Reliable staffing support for homes and businesses.</h1>
              <p>
                We connect people with trusted babysitters, cooks,
                receptionists, house helpers, and everyday support staff through
                a process built on clarity, care, and professionalism.
              </p>

              <div className="about-hero-actions">
                <Link href="/contact" className="btn-primary btn-compact">
                  Contact Us <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/services" className="btn-outline btn-compact">
                  View Services
                </Link>
              </div>
            </div>

            <div className="about-stats-v2 about-animate about-delay-1 scroll-reveal reveal-delay-1">
              {stats.map((item) => (
                <article key={item.label} className="about-stat-v2">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-story-v2">
          <div className="about-container about-story-grid-v2">
            <div className="about-photo-card about-animate scroll-reveal">
              <div className="about-photo" />
              <div className="about-photo-note">
                <span>
                  <FaUserTie />
                </span>
                <div>
                  <strong>Professional, simple, reliable.</strong>
                  <p>Staffing support made easier for daily needs.</p>
                </div>
              </div>
            </div>

            <div className="about-story-content-v2 about-animate about-delay-1 scroll-reveal reveal-delay-1">
              <p className="about-kicker">Our Story</p>
              <h2>Built to make staffing feel less stressful.</h2>
              <p>
                SSS Recruitment started with a simple idea: finding reliable
                help should not feel confusing or risky. Whether someone needs
                home support or business staff, we help organize the process
                with a clear, human approach.
              </p>
              <p>
                Our focus is on practical staffing services, honest
                communication, and matching people with support that fits their
                routine, comfort, and expectations.
              </p>
            </div>
          </div>
        </section>

        <section className="about-values-v2">
          <div className="about-container">
            <div className="about-section-head about-animate scroll-reveal">
              <p className="about-kicker">Why clients choose us</p>
              <h2>What makes us different</h2>
              <p>
                We keep the experience simple, supportive, and focused on real
                staffing needs.
              </p>
            </div>

            <div className="about-values-grid-v2">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="about-value-v2 about-animate scroll-reveal"
                >
                  <span>{value.icon}</span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-process-v2">
          <div className="about-container about-process-grid-v2">
            <div className="about-process-copy about-animate scroll-reveal">
              <p className="about-kicker">How We Work</p>
              <h2>A clear process from enquiry to support.</h2>
              <p>
                We keep every step easy to understand so you know what is
                happening, what information is needed, and how the right staff
                option is selected.
              </p>
            </div>

            <div className="about-process-list-v2 about-animate about-delay-1 scroll-reveal reveal-delay-1">
              {process.map((step, index) => (
                <article key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                  <FaCheckCircle />
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
