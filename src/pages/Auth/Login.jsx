
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Building2,
  ShieldCheck,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

const roles = [
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "agency", label: "Agency", icon: Building2 },
  { id: "admin", label: "Admin", icon: ShieldCheck },
];

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: normalizedEmail,
          password,
          role,
        }),
      });

      // Read the response safely so HTML errors are easier to diagnose.
      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "The backend returned an unexpected response. Check the backend routes and terminal."
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (!data.user) {
        throw new Error("The server did not return the account details.");
      }

      if (role === "admin" && data.user.role !== "ADMIN") {
        throw new Error("Administrator access is required.");
      }

      if (role === "agency" && data.user.role !== "AGENCY") {
        throw new Error("An agency account is required.");
      }

      if (role === "student" && data.user.role !== "USER") {
        throw new Error("A student account is required.");
      }

      // The backend has authenticated the account.
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "agency") {
        navigate("/agency/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the backend. Make sure it is running on port 5000."
          : err.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F7F4]">
      <main className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-4 py-10">
        <div className="mb-7 text-center">
          <Link to="/" className="text-xl font-bold text-[#075C36]">
            FuturePath
          </Link>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-[34px]">
            Welcome back
          </h1>

          <p className="mt-1 text-sm text-[#98A2B3]">
            Log in to your account.
          </p>
        </div>

        <section className="w-full max-w-[480px] rounded-2xl border border-[#E0E5E9] bg-white px-6 py-8 shadow-sm sm:px-11 sm:py-10">
          <div className="mb-7 grid grid-cols-3 gap-1 rounded-xl bg-[#F1F2F5] p-1">
            {roles.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setRole(id);
                  setError("");
                }}
                className={`flex min-w-0 items-center justify-center gap-1 rounded-lg px-1 py-3 text-xs font-semibold transition sm:gap-1.5 sm:text-sm ${
                  role === id
                    ? "bg-white text-[#075C36] shadow-sm"
                    : "text-[#667085] hover:text-[#075C36]"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#98A2B3]"
              >
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#E0E5EB] bg-white px-4 text-sm text-[#111827] outline-none focus:border-[#075C36] focus:ring-2 focus:ring-[#075C36]/10"
                required
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="login-password"
                  className="text-xs font-bold uppercase tracking-wide text-[#98A2B3]"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[#075C36] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-xl border border-[#E0E5EB] bg-white px-4 pr-12 text-sm text-[#111827] outline-none focus:border-[#075C36] focus:ring-2 focus:ring-[#075C36]/10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-3 flex items-center text-[#98A2B3] hover:text-[#075C36]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#0B603A] text-sm font-bold text-white transition hover:bg-[#084A2D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Log in"}
            </button>
          </form>

          <div className="mt-5 border-t border-[#F0F0F0] pt-5 text-center">
            <p className="text-sm text-[#98A2B3]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-[#075C36] hover:underline"
              >
                Sign up free →
              </Link>
            </p>
          </div>
        </section>

        <p className="mt-4 text-center text-xs text-[#98A2B3]">
          {role === "student" && "Signing in as a student or individual."}
          {role === "agency" && "Signing in as an agency or consultant."}
          {role === "admin" && "Administrator access to FuturePath."}
        </p>
      </main>
    </div>
  );
}
