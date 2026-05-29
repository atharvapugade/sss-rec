import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const contactDetails = [
  {
    icon: <FaPhoneAlt />,
    label: "Call Support",
    value: "+91 98765 43210",
    text: "Speak with us for quick staffing guidance.",
  },
  {
    icon: <FaEnvelope />,
    label: "Email Us",
    value: "support@sssrecruitment.com",
    text: "Send your requirement and we will respond clearly.",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Service Area",
    value: "Local home & business staffing",
    text: "Support for families, homes, offices, and daily needs.",
  },
];

const quickNeeds = [
  "Babysitter",
  "Cook Services",
  "Receptionist",
  "House Helpers",
  "Monthly Staff",
  "Urgent Help",
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ScrollReveal />

      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-container">
            <div className="contact-hero-copy scroll-reveal">
              <p className="contact-kicker">Contact SSS Recruitment</p>
              <h1>Have a question? We are here to help.</h1>
              <p>
                Reach out for general enquiries, support, feedback, or any
                information about SSS Recruitment. Our team will get back to you
                with a clear and helpful response.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-main-section">
          <div className="contact-container contact-grid">
            <div className="contact-info-panel scroll-reveal">
              <p className="contact-kicker">Quick Support</p>
              <h2>Send us a message anytime.</h2>
              <p>
                Use this page for normal contact, questions, or support. If you
                want to hire staff, we will handle that through a separate
                dedicated form.
              </p>

              <div className="contact-detail-list">
                {contactDetails.map((item) => (
                  <article key={item.label} className="contact-detail-card">
                    <span>{item.icon}</span>
                    <div>
                      <h3>{item.label}</h3>
                      <strong>{item.value}</strong>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="contact-hours">
                <FaClock />
                <div>
                  <strong>Support Hours</strong>
                  <p>Monday to Saturday, 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-form-card scroll-reveal reveal-delay-1">
              <div className="contact-form-head">
                <p className="contact-kicker">Send Enquiry</p>
                <h2>Fill the details</h2>
                <p>Write your message and we will reply as soon as possible.</p>
              </div>

              <form className="contact-form">
                <div className="contact-field-row">
                  <label>
                    Full Name
                    <input type="text" placeholder="Enter your name" />
                  </label>

                  <label>
                    Phone Number
                    <input type="tel" placeholder="Enter phone number" />
                  </label>
                </div>

                <label>
                  Email Address
                  <input type="email" placeholder="Enter email address" />
                </label>

                <label>
                  Reason for Contact
                  <select defaultValue="">
                    <option value="" disabled>
                      Select a reason
                    </option>
                    <option>General Enquiry</option>
                    <option>Support</option>
                    <option>Feedback</option>
                    <option>Business Enquiry</option>
                  </select>
                </label>

                <label>
                  Your Message
                  <textarea
                    rows="5"
                    placeholder="Type your message here"
                  />
                </label>

                <button type="button" className="btn-primary contact-submit">
                  Send Message <FaPaperPlane />
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="contact-bottom-section">
          <div className="contact-container">
            <div className="contact-need-box scroll-reveal">
              <div>
                <p className="contact-kicker">Popular Requests</p>
                <h2>Not sure what to ask? Start from here.</h2>
              </div>

              <div className="contact-need-tags">
                {quickNeeds.map((need) => (
                  <span key={need}>{need}</span>
                ))}
              </div>

              <a className="contact-whatsapp" href="https://wa.me/919876543210">
                <FaWhatsapp />
                WhatsApp Support
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
