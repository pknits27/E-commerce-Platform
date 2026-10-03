import { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/orders/")
      .then(res => setOrders(res.data))
      .catch(() => setError("Could not load orders."));
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>
      {error && <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
      {!orders.length && !error && <p className="text-slate-500">No orders yet.</p>}
      <div className="space-y-5">
        {orders.map(order => (
          <div key={order.id} className="rounded-2xl border bg-white p-6">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold">Order #{order.id}</h2>
                <p className="text-sm text-slate-500">{new Date(order.created_at).toLocaleString()}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">{order.status}</span>
            </div>
            <div className="mt-5 space-y-2">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.product_name} × {item.quantity}</span>
                  <span>₹{item.subtotal}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t pt-4 text-right font-bold">Total: ₹{order.total_amount}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
