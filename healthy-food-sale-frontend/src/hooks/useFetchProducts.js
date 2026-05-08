import { useEffect, useState } from "react";
import { getProducts } from "../services/productService.js";

export default function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await getProducts();

        if (isMounted) {
          setProducts(res.data || []);
          setError("");
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error?.response?.data?.message || "Failed to fetch products",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    products,
    loading,
    error,
  };
}
