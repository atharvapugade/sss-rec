"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

const services = ["Babysitter", "Cook Services", "Receptionist", "House Helpers"];

const countryCodes = [
  { label: "India", code: "+91" },
  { label: "United States", code: "+1" },
  { label: "United Kingdom", code: "+44" },
  { label: "United Arab Emirates", code: "+971" },
  { label: "Canada", code: "+1" },
  { label: "Australia", code: "+61" },
  { label: "Bangladesh", code: "+880" },
  { label: "France", code: "+33" },
  { label: "Germany", code: "+49" },
  { label: "Japan", code: "+81" },
  { label: "Malaysia", code: "+60" },
  { label: "Nepal", code: "+977" },
  { label: "Pakistan", code: "+92" },
  { label: "Qatar", code: "+974" },
  { label: "Saudi Arabia", code: "+966" },
  { label: "Singapore", code: "+65" },
  { label: "Sri Lanka", code: "+94" },
  { label: "Thailand", code: "+66" },
];

export default function HireServiceModal({
  serviceName,
  buttonLabel,
  buttonClassName = "service-hire-btn",
  ariaLabel,
  showArrow = true,
}) {
  const initialService = services.includes(serviceName) ? serviceName : "";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(initialService);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openModal = () => {
    setSelectedService(initialService);
    setStatusMessage("");
    setIsSubmitted(false);
    setIsOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      countryCode: formData.get("countryCode"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      method: formData.get("method"),
      location: formData.get("location"),
      requirement: formData.get("requirement"),
    };

    try {
      const response = await fetch("/api/service-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed.");
      }

      form.reset();
      setSelectedService(initialService);
      setIsSubmitted(true);
    } catch (error) {
      setStatusMessage(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={buttonClassName}
        aria-label={ariaLabel || buttonLabel || `Hire ${serviceName}`}
        onClick={openModal}
      >
        {buttonLabel || `Hire ${serviceName}`}{" "}
        {showArrow && <span aria-hidden="true">&rarr;</span>}
      </button>

      {isOpen &&
        createPortal(
          <div className="hire-modal-backdrop" role="presentation">
            {isSubmitted ? (
              <div
                className="hire-success-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="hire-success-title"
              >
                <div className="hire-success-icon" aria-hidden="true">✓</div>
                <h2 id="hire-success-title">Request submitted successfully</h2>
                <p>Our team will contact you shortly.</p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  OK
                </button>
              </div>
            ) : (
              <div
                className="hire-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="hire-service-modal-title"
              >
                <button
                  type="button"
                  className="hire-modal-close"
                  aria-label="Close form"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes />
                </button>

                <div className="hire-modal-head">
                  <p>Hire Staff</p>
                  <h2 id="hire-service-modal-title">
                    {initialService
                      ? `Request ${serviceName}`
                      : "Request Staffing Support"}
                  </h2>
                  <span>
                    Fill the details and our team will understand your requirement.
                  </span>
                </div>

                <form className="hire-modal-form" onSubmit={handleSubmit}>
                  <div className="hire-field-row">
                    <label>
                      Name
                      <input name="name" type="text" placeholder="Enter full name" required />
                    </label>

                    <label>
                      Email
                      <input name="email" type="email" placeholder="Enter email address" required />
                    </label>
                  </div>

                  <div className="hire-phone-row">
                    <label>
                      Country Code
                      <select name="countryCode" defaultValue="+91">
                        {countryCodes.map((country) => (
                          <option key={`${country.label}-${country.code}`} value={country.code}>
                            {country.label} ({country.code})
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Number
                      <input name="phone" type="tel" placeholder="Enter phone number" required />
                    </label>
                  </div>

                  <div className="hire-field-row">
                    <label>
                      Service
                      <select
                        name="service"
                        value={selectedService}
                        onChange={(event) => setSelectedService(event.target.value)}
                        required
                      >
                        {!initialService && (
                          <option value="" disabled>
                            Select a service
                          </option>
                        )}
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Hiring Method
                      <select name="method" defaultValue="Monthly">
                        <option>Hourly</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Location
                    <input name="location" type="text" placeholder="Enter your location" required />
                  </label>

                  <label>
                    Extra Requirements
                    <textarea
                      name="requirement"
                      rows="4"
                      placeholder="Mention timing, duties, budget, or any special requirement"
                    />
                  </label>

                  <div className="hire-modal-actions">
                    {statusMessage && (
                      <p className="hire-form-message">{statusMessage}</p>
                    )}
                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                    <button
                      type="button"
                      className="hire-cancel-btn"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
