import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/products/")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Unable to load products."));
  }, []);

  const handleAdd = async (id) => {
    if (!user) {
      alert("Please login to add items to your cart.");
      return;
    }
    try {
      await addToCart(id);
      alert("Added to cart.");
    } catch (err) {
      alert(err.response?.data?.detail || "Could not add to cart.");
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 rounded-3xl bg-slate-900 px-8 py-12 text-white">
        <p className="mb-2 text-sm uppercase tracking-widest text-slate-300">Modern commerce</p>
        <h1 className="text-4xl font-bold">Everything you need, in one place.</h1>
        <p className="mt-3 max-w-xl text-slate-300">A full-stack Django + React shopping experience.</p>
      </div>

      {error && <p className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}

      <h2 className="mb-6 text-2xl font-bold">Products</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="h-56 w-full object-cover" />
            ) : (
              <div className="flex h-56 items-center justify-center bg-slate-100 text-slate-400">No image</div>
            )}
            <div className="p-5">
              <p className="text-xs uppercase text-slate-500">{product.category_name}</p>
              <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xl font-bold">₹{product.price}</span>
                <button onClick={() => handleAdd(product.id)} disabled={!product.stock}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:bg-slate-300">
                  {product.stock ? "Add to cart" : "Out of stock"}
                </button>
              </div>
              <Link to={`/products/${product.id}`} className="mt-3 block text-sm text-blue-600">View details →</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
