import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { FaCheckCircle, FaClock, FaHandshake } from "react-icons/fa";

const homeReasons = [
  {
    icon: <FaHandshake />,
    title: "Easy Communication",
    text: "We keep the process clear from your first enquiry, so you know what to expect.",
  },
  {
    icon: <FaClock />,
    title: "Flexible Support",
    text: "Get guidance for hourly, daily, weekly, or monthly staffing needs.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Reliable Categories",
    text: "Babysitters, cooks, receptionists, and house helpers for practical daily needs.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollReveal />
      <Hero />
      <Services />
      <section className="home-reasons-section">
        <div className="container-custom home-reasons-inner">
          <div className="home-reasons-head scroll-reveal">
            <p>Why Choose Us</p>
            <h2>Hiring support that feels simple and personal.</h2>
          </div>

          <div className="home-reasons-grid">
            {homeReasons.map((reason) => (
              <article key={reason.title} className="home-reason-card scroll-reveal">
                <span>{reason.icon}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
