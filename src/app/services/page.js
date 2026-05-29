import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import HireServiceModal from "@/components/HireServiceModal";
import { FaBaby, FaHome, FaUserTie, FaUtensils } from "react-icons/fa";

const services = [
  {
    title: "Babysitter",
    eyebrow: "Childcare support",
    icon: <FaBaby />,
    intro:
      "Need someone caring and reliable for your child? We help families find babysitters for daily routines, school-time support, evening care, and flexible home childcare needs.",
    bestFor: "Working parents, busy families, newborn care support, and after-school supervision.",
    pricing:
      "Hire as per your comfort — hourly, daily, weekly, or monthly. No pressure, no confusing process, just choose what suits your routine and budget.",
    points: [
      "Child supervision at home",
      "Feeding, playtime, and basic routine support",
      "Short-term or regular babysitting help",
      "Clear communication before finalizing staff",
    ],
  },
  {
    title: "Cook Services",
    eyebrow: "Home food made easy",
    icon: <FaUtensils />,
    intro:
      "Good food at home should not be stressful. We connect you with cooks for daily meals, family cooking, basic kitchen help, and regular home food preparation.",
    bestFor: "Families, students, working professionals, elders, and homes needing regular meal support.",
    pricing:
      "You can discuss monthly, weekly, part-time, or daily cooking needs. Simple setup, practical pricing, and service according to your food habits.",
    points: [
      "Breakfast, lunch, dinner, or selected meal support",
      "Home-style cooking based on your preference",
      "Regular or temporary cook availability",
      "Helpful for busy routines and family homes",
    ],
  },
  {
    title: "Receptionist",
    eyebrow: "Front desk staff",
    icon: <FaUserTie />,
    intro:
      "A good receptionist creates the first impression. We support businesses with front desk staff who can manage visitors, calls, basic coordination, and daily office handling.",
    bestFor: "Clinics, offices, salons, shops, agencies, institutes, and small businesses.",
    pricing:
      "Choose part-time, full-time, weekly, or monthly staffing based on your business hours. You get practical support without overcomplicating hiring.",
    points: [
      "Guest greeting and front desk handling",
      "Call coordination and appointment support",
      "Basic admin and visitor communication",
      "Professional presence for your workplace",
    ],
  },
  {
    title: "House Helpers",
    eyebrow: "Daily home support",
    icon: <FaHome />,
    intro:
      "For daily home cleaning and household help, we make it easier to find support that fits your timing, comfort, and work requirement.",
    bestFor: "Families, apartments, elders, busy homes, and anyone needing regular household assistance.",
    pricing:
      "Pay as you need — hourly, daily, weekly, or monthly. Whether it is regular help or short-term support, we help you find a better fit.",
    points: [
      "Cleaning and basic home support",
      "Kitchen, room, and general household assistance",
      "Flexible timing based on availability",
      "Helpful support for daily home routines",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <ScrollReveal />

      <main className="services-page">
        <section className="services-page-hero">
          <div className="services-page-container">
            <div className="services-page-hero-copy services-page-animate scroll-reveal">
              <p className="services-page-kicker">Our Services</p>
              <h1>Staffing help that actually fits your daily life.</h1>
              <p>
                From babysitters to cooks, receptionists, and house helpers, we
                keep hiring simple, clear, and budget-friendly. Tell us what you
                need, choose the timing that works, and we help you move ahead
                without stress.
              </p>

              <div className="services-page-actions">
                <HireServiceModal
                  serviceName="All Services"
                  buttonLabel="Hire Now"
                  buttonClassName="btn-primary btn-compact"
                />
                <a href="#service-details" className="btn-outline btn-compact">
                  Explore Services
                </a>
              </div>
            </div>

            <div className="services-page-summary services-page-animate services-page-delay scroll-reveal reveal-delay-1">
              <span>Hourly</span>
              <span>Daily</span>
              <span>Weekly</span>
              <span>Monthly</span>
            </div>
          </div>
        </section>

        <section id="service-details" className="services-page-details">
          <div className="services-page-container">
            <div className="services-page-heading services-page-animate scroll-reveal">
              <p className="services-page-kicker">What You Get</p>
              <h2>Understand each service before you choose</h2>
              <p>
                No random guessing. Each service is explained properly so you
                know what support is available and how it can fit your home or
                business.
              </p>
            </div>

            <div className="services-page-list">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className="service-info-row services-page-animate scroll-reveal"
                >
                  <div className="service-info-main">
                    <div className="service-info-icon">{service.icon}</div>
                    <p className="services-page-kicker">{service.eyebrow}</p>
                    <h3>{service.title}</h3>
                    <p>{service.intro}</p>
                  </div>

                  <div className="service-info-side">
                    <div>
                      <span>Best for</span>
                      <p>{service.bestFor}</p>
                    </div>

                    <div>
                      <span>Payment flexibility</span>
                      <p>{service.pricing}</p>
                    </div>

                    <ul>
                      {service.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>

                  </div>

                  <div className="service-info-action">
                    <HireServiceModal serviceName={service.title} />
                  </div>

                  <strong aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services-page-cta">
          <div className="services-page-container">
            <div className="services-cta-box services-page-animate scroll-reveal">
              <p className="services-page-kicker">Need Staff?</p>
              <h2>Tell us your requirement and we will guide you properly.</h2>
              <p>
                Share the service type, timing, location, and budget range. We
                will help you understand the next step in a simple way.
              </p>
              <HireServiceModal
                serviceName="All Services"
                buttonLabel="Hire Now"
                buttonClassName="btn-dark"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
