import { useMemo, useState } from "react";
import useFetchProducts from "../hooks/useFetchProducts.js";
import SearchBar from "../components/common/SearchBar.jsx";
import Loader from "../components/common/Loader.jsx";
import ProductCard from "../components/user/ProductCard.jsx";
import "./Home.css";

export default function Home() {
  const { products, loading, error } = useFetchProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-overlay">
          <h1>Fresh Vegetables & Fruits</h1>
          <p>
            Buy healthy, organic, and fresh farm products at affordable prices.
          </p>

          <div className="search-wrapper">
            <SearchBar
              onSearch={setSearchTerm}
              placeholder="Search vegetable or fruits..."
            />
          </div>
        </div>
      </header>

      <section className="products-section">
        <div className="section-header">
          <h2>Available Products</h2>
          <span>{filteredProducts.length} Products Found</span>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try searching with a different keyword.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
