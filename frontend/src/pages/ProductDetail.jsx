import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}/`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <main className="p-10 text-center">Loading...</main>;

  const add = async () => {
    if (!user) return alert("Please login first.");
    try {
      await addToCart(product.id);
      alert("Added to cart.");
    } catch (err) {
      alert(err.response?.data?.detail || "Could not add to cart.");
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white">
          {product.image_url ? <img src={product.image_url} alt={product.name} className="w-full object-cover" /> :
            <div className="flex h-96 items-center justify-center bg-slate-100 text-slate-400">No image</div>}
        </div>
        <div>
          <p className="text-sm uppercase text-slate-500">{product.category_name}</p>
          <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>
          <p className="mt-5 text-slate-600">{product.description}</p>
          <p className="mt-8 text-3xl font-bold">₹{product.price}</p>
          <p className="mt-2 text-sm text-slate-500">{product.stock} available</p>
          <button disabled={!product.stock} onClick={add} className="mt-7 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white disabled:bg-slate-300">
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
