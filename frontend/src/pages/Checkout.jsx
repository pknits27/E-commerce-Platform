import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { cart, refreshCart } = useCart();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/orders/", { shipping_address: address });
      await refreshCart();
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.detail || "Checkout failed.");
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-2 text-slate-600">Order total: ₹{cart.total}</p>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
        <form onSubmit={submit} className="mt-6">
          <label className="mb-2 block text-sm font-medium">Shipping address</label>
          <textarea required rows="5" className="w-full rounded-lg border p-3"
            value={address} onChange={e => setAddress(e.target.value)}
            placeholder="House, street, city, state, PIN" />
          <button className="mt-5 w-full rounded-lg bg-slate-900 py-3 font-medium text-white">Place order</button>
        </form>
      </div>
    </main>
  );
}
