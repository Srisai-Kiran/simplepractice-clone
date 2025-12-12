// src/pages/auth/register.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role })
      });
      const body = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(body?.error || "Registration failed");
        return;
      }
      router.push("/auth/login");
    } catch (err) {
      setLoading(false);
      setError("Network error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-semibold mb-2">Create account</h1>
          <p className="text-sm text-slate-500 mb-6">Use your email to create an account</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-300 p-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-300 p-2"
                placeholder="Your full name (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-300 p-2"
                placeholder="Choose a secure password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="mt-1 block w-40 rounded-md border-slate-200 p-2"
              >
                <option value="PATIENT">Patient</option>
                <option value="PROVIDER">Provider</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create account"}
              </button>
            </div>

            {error && <p className="text-red-600">{error}</p>}
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account? <a href="/auth/login" className="text-sky-600">Sign in</a>
        </p>
      </div>
    </div>
  );
}
