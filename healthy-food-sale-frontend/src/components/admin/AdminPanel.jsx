import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService.js";
import ProductForm from "./ProductForm.jsx";
import ProductList from "./ProductList.jsx";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);

  const load = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Admin</h2>
      <ProductForm reload={load} />
      <ProductList products={products} reload={load} />
    </div>
  );
}
