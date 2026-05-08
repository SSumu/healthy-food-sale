import { deleteProduct } from "../../services/productService.js";

export default function ProductList({ products, reload }) {
  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>
          {p.name} - Rs.{p.price}
          <button
            onClick={async () => {
              await deleteProduct(p._id);
              reload();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
