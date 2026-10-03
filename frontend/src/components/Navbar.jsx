import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-slate-900">ShopSphere</Link>
        <div className="flex items-center gap-5">
          <Link to="/" className="text-sm hover:text-blue-600">Products</Link>
          {user && <Link to="/orders" className="text-sm hover:text-blue-600">Orders</Link>}
          {user ? (
            <>
              <Link to="/cart" className="text-sm font-medium">Cart ({cart.items.length})</Link>
              <span className="text-sm text-slate-500">{user.username}</span>
              <button onClick={logout} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
