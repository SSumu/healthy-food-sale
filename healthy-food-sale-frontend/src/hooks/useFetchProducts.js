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

        console.log("Products Response:", res.data);

        if (isMounted) {
          // Ensure products is always an array
          if (Array.isArray(res.data)) {
            setProducts(res.data);
          } else if (Array.isArray(res.data.products)) {
            setProducts(res.data.products);
          } else {
            setProducts([]);
          }

          setError("");
        }
      } catch (error) {
        console.error(error);

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
