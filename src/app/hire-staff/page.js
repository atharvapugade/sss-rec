"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HireStaffPage() {
  return (
    <>
      <Navbar />

      <section className="pt-28 pb-16 bg-white min-h-screen">
        <div className="container-custom max-w-6xl">
          <div className="mb-10">
            <p className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-700">
              Staffing enquiry
            </p>

            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
              Hire Staff
            </h1>

            <p className="mt-3 max-w-2xl text-base md:text-lg text-gray-600">
              Share your staffing need with us and we will get back with the right support options, timings, and availability.
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
            <div className="rounded-3xl bg-yellow-50 border border-yellow-100 p-8 card-shadow">
              <h2 className="text-2xl font-bold text-gray-900">
                Why clients trust us
              </h2>

              <ul className="mt-5 space-y-4 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-yellow-500" />
                  <span>Verified professionals with proper screening and reliability checks.</span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-yellow-500" />
                  <span>Flexible staffing support for homes, offices, and urgent coverage needs.</span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-yellow-500" />
                  <span>Clear communication, organized follow-up, and timely response to every request.</span>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl bg-white border border-yellow-100 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-yellow-700">
                  Response time
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">24 hours</p>
                <p className="mt-2 text-sm text-gray-600">
                  Most enquiries receive a personalized follow-up within one business day.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-gray-200 p-6 md:p-8 card-shadow">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-yellow-600">
                  Request form
                </p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Tell us what you need
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Fill in the details below and we will contact you with the best staffing option.
                </p>
              </div>

              <form className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-gray-700">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Asha Mehta"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="asha@example.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="98765 43210"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-semibold text-gray-700">
                    Service type
                  </label>
                  <select
                    id="service"
                    defaultValue=""
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  >
                    <option value="" disabled>Select service</option>
                    <option>Babysitter</option>
                    <option>Cook</option>
                    <option>Receptionist</option>
                    <option>House Helper</option>
                    <option>Postnatal Care</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="hours" className="mb-2 block text-sm font-semibold text-gray-700">
                    Preferred hours
                  </label>
                  <input
                    id="hours"
                    type="text"
                    placeholder="8:00 AM – 5:00 PM"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="mb-2 block text-sm font-semibold text-gray-700">
                    Working location
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="Mumbai, Bandra"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="requirements" className="mb-2 block text-sm font-semibold text-gray-700">
                    Additional requirements
                  </label>
                  <textarea
                    id="requirements"
                    rows="4"
                    placeholder="Mention experience level, special care needs, or other important details."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <button className="btn-primary w-full md:w-fit">
                    Submit Requirement
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}