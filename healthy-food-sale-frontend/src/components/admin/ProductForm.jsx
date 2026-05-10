import { useState } from "react";
import { createProduct } from "../../services/productService.js";
import "./ProductForm.css";

export default function ProductForm({ reload }) {
  const [form, setForm] = useState({ name: "", price: "" });

  const submit = async (e) => {
    e.preventDefault();
    await createProduct(form);
    reload();
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <button>Add</button>
    </form>
  );
}
