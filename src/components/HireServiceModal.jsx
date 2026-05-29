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
  { label: "Afghanistan", code: "+93" },
  { label: "Albania", code: "+355" },
  { label: "Algeria", code: "+213" },
  { label: "Argentina", code: "+54" },
  { label: "Austria", code: "+43" },
  { label: "Bangladesh", code: "+880" },
  { label: "Belgium", code: "+32" },
  { label: "Brazil", code: "+55" },
  { label: "China", code: "+86" },
  { label: "Denmark", code: "+45" },
  { label: "Egypt", code: "+20" },
  { label: "France", code: "+33" },
  { label: "Germany", code: "+49" },
  { label: "Indonesia", code: "+62" },
  { label: "Italy", code: "+39" },
  { label: "Japan", code: "+81" },
  { label: "Malaysia", code: "+60" },
  { label: "Nepal", code: "+977" },
  { label: "Netherlands", code: "+31" },
  { label: "New Zealand", code: "+64" },
  { label: "Pakistan", code: "+92" },
  { label: "Philippines", code: "+63" },
  { label: "Qatar", code: "+974" },
  { label: "Saudi Arabia", code: "+966" },
  { label: "Singapore", code: "+65" },
  { label: "South Africa", code: "+27" },
  { label: "South Korea", code: "+82" },
  { label: "Spain", code: "+34" },
  { label: "Sri Lanka", code: "+94" },
  { label: "Thailand", code: "+66" },
  { label: "Turkey", code: "+90" },
  { label: "Vietnam", code: "+84" },
];

export default function HireServiceModal({
  serviceName,
  buttonLabel,
  buttonClassName = "service-hire-btn",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const initialService = services.includes(serviceName) ? serviceName : "";
  const [selectedService, setSelectedService] = useState(initialService);

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
    setIsOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      <button type="button" className={buttonClassName} onClick={openModal}>
        {buttonLabel || `Hire ${serviceName}`}{" "}
        <span aria-hidden="true">&rarr;</span>
      </button>

      {isOpen && createPortal(
        <div className="hire-modal-backdrop" role="presentation">
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
                {initialService ? `Request ${serviceName}` : "Request Staffing Support"}
              </h2>
              <span>
                Fill the details and our team will understand your requirement.
              </span>
            </div>

            <form className="hire-modal-form" onSubmit={handleSubmit}>
              <div className="hire-field-row">
                <label>
                  Name
                  <input type="text" placeholder="Enter full name" required />
                </label>

                <label>
                  Email
                  <input type="email" placeholder="Enter email address" required />
                </label>
              </div>

              <div className="hire-phone-row">
                <label>
                  Country Code
                  <select defaultValue="+91">
                    {countryCodes.map((country) => (
                      <option
                        key={`${country.label}-${country.code}`}
                        value={country.code}
                      >
                        {country.label} ({country.code})
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Number
                  <input type="tel" placeholder="Enter phone number" required />
                </label>
              </div>

              <div className="hire-field-row">
                <label>
                  Service
                  <select
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
                  <select defaultValue="Monthly">
                    <option>Hourly</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </label>
              </div>

              <label>
                Location
                <input type="text" placeholder="Enter your location" required />
              </label>

              <label>
                Extra Requirements
                <textarea
                  rows="4"
                  placeholder="Mention timing, duties, budget, or any special requirement"
                />
              </label>

              <div className="hire-modal-actions">
                <button type="submit" className="btn-primary">
                  Submit Request
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
        </div>,
        document.body
      )}
    </>
  );
}
