"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaLock, FaUserShield } from "react-icons/fa";

export default function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed.");
      }

      router.push("/admin-7c2b6a/dashboard");
      router.refresh();
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <label>
        Admin Email
        <div>
          <FaUserShield />
          <input
            name="email"
            type="email"
            placeholder="Enter admin email"
            autoComplete="username"
            required
          />
        </div>
      </label>

      <label>
        Password
        <div className="admin-password-field">
          <FaLock />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="admin-password-toggle"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </label>

      {message && <p className="admin-login-error">{message}</p>}

      <button type="submit" className="admin-login-btn" disabled={isSubmitting}>
        {isSubmitting ? "Checking..." : "Login to Dashboard"}
      </button>
    </form>
  );
}
