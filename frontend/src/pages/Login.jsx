import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input className="w-full rounded-lg border p-3" placeholder="Username"
            value={form.username} onChange={e => setForm({...form, username:e.target.value})} />
          <input className="w-full rounded-lg border p-3" type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
          <button className="w-full rounded-lg bg-slate-900 p-3 font-medium text-white">Login</button>
        </form>
        <p className="mt-5 text-sm text-slate-600">Don't have an account? <Link className="text-blue-600" to="/register">Register</Link></p>
      </div>
    </main>
  );
}
