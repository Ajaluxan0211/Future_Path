
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

export default function StudentRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    interest: "Student Visa",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const normalizedEmail = form.email.trim().toLowerCase();

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !normalizedEmail ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: normalizedEmail,
          password: form.password,
          confirmPassword: form.confirmPassword,
          interest: form.interest,
        }),
      });

      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "The backend returned an unexpected response. Check your backend routes."
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            email: normalizedEmail,
            registered: true,
          },
        });
      }, 1000);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Unable to connect to the backend. Check that it is running."
          : err.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "h-12 w-full rounded-xl border border-[#E0E5EB] bg-white px-4 text-sm outline-none focus:border-[#075C36] focus:ring-2 focus:ring-[#075C36]/10";

  return (
    <div className="min-h-screen bg-[#F0F7F4] px-4 py-10">
      <section className="mx-auto w-full max-w-xl rounded-2xl border border-[#E0E5E9] bg-white p-6 shadow-sm sm:p-10">
        <h1 className="text-center text-3xl font-extrabold text-[#111827]">
          Create your account
        </h1>

        <p className="mb-8 mt-2 text-center text-sm text-[#667085]">
          Register as a student or professional.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-xs font-bold uppercase text-[#667085]"
              >
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-xs font-bold uppercase text-[#667085]"
              >
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-2 block text-xs font-bold uppercase text-[#667085]"
            >
              Email address
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="mb-2 block text-xs font-bold uppercase text-[#667085]"
            >
              Password
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={8}
              className={inputClass}
              required
            />
            <p className="mt-1 text-xs text-[#98A2B3]">
              Use at least 8 characters.
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs font-bold uppercase text-[#667085]"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label
              htmlFor="interest"
              className="mb-2 block text-xs font-bold uppercase text-[#667085]"
            >
              Area of interest
            </label>
            <select
              id="interest"
              name="interest"
              value={form.interest}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Student Visa</option>
              <option>Work Visa</option>
              <option>Tourist Visa</option>
            </select>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-[#0B603A] font-bold text-white transition hover:bg-[#084A2D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#667085]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-[#075C36] hover:underline"
          >
            Log in
          </Link>
        </p>
      </section>
    </div>
  );
}
