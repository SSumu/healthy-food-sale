import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService.js";
import "./UserView.css";

export default function UserView() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="user-view-container">
      <h2 className="title">Available Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <div className="product-name">{p.name}</div>
            <div className="product-price">Rs. {p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
