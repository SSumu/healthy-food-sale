import { deleteProduct } from "../../services/productService.js";

export default function ProductList({ products = [], reload }) {
  // Debugging
  console.log("Products:", products);
  console.log("Is Array:", Array.isArray(products));

  if (!Array.isArray(products)) {
    return <p>Invalid product data</p>;
  }

  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>
          {p.name} - Rs.{p.price}
          <button
            onClick={async () => {
              try {
                await deleteProduct(p._id);

                if (reload) {
                  reload();
                }
              } catch (error) {
                console.error("Delete failed:", error);
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
