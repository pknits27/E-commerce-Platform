import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form.username, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.username?.[0] || "Registration failed.");
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Create account</h1>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input className="w-full rounded-lg border p-3" placeholder="Username"
            value={form.username} onChange={e => setForm({...form, username:e.target.value})} />
          <input className="w-full rounded-lg border p-3" type="email" placeholder="Email"
            value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
          <input className="w-full rounded-lg border p-3" type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
          <button className="w-full rounded-lg bg-slate-900 p-3 font-medium text-white">Register</button>
        </form>
        <p className="mt-5 text-sm text-slate-600">Already registered? <Link className="text-blue-600" to="/login">Login</Link></p>
      </div>
    </main>
  );
}
