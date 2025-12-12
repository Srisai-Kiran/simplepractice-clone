// src/pages/auth/login.js
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });
    setLoading(false);
    if (res?.error) {
      setErr(res.error);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
          <p className="text-sm text-slate-500 mb-6">Sign in to your account</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-300 p-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-300 p-2"
                placeholder="Your password"
              />
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            {err && <p className="text-red-600">{err}</p>}
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-4">
          Don't have an account? <a href="/auth/register" className="text-sky-600">Create one</a>
        </p>
      </div>
    </div>
  );
}
