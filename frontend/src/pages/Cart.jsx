import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!cart.items.length) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <Link to="/" className="mt-5 inline-block text-blue-600">Continue shopping →</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.items.map(item => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border bg-white p-5">
            <div>
              <h2 className="font-semibold">{item.product_name}</h2>
              <p className="text-sm text-slate-500">₹{item.price} each</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded border px-3 py-1" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button className="rounded border px-3 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button className="ml-3 text-sm text-red-600" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
            <strong>₹{item.subtotal}</strong>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between rounded-xl bg-slate-900 p-6 text-white">
        <span className="text-lg">Total</span>
        <span className="text-2xl font-bold">₹{cart.total}</span>
      </div>
      <button onClick={() => navigate("/checkout")} className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white">
        Proceed to checkout
      </button>
    </main>
  );
}
