import "./ProductCard.css";

export default function ProductCard({ product, onEdit, onDelete }) {
  if (!product) return null;

  const handleEdit = () => {
    if (onEdit) onEdit(product);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete '${product.name}'?`,
    );

    if (confirmDelete && onDelete) {
      onDelete(product._id);
    }
  };

  return (
    <div className="product-card">
      <div className="product-header">
        <h3 className="product-name">{product.name}</h3>
        <span className={`product-type ${product.type}`}>{product.type}</span>
      </div>
      <div className="product-body">
        <p>
          <strong>Price:</strong> Rs. {product.price}
        </p>

        {product.harvestDate && (
          <p>
            <strong>Harvest Date:</strong>{" "}
            {new Date(product.harvestDate).toLocaleDateString()}
          </p>
        )}

        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
      </div>

      <div className="product-footer">
        <button className="edit-btn" onClick={handleEdit}>
          Edit
        </button>

        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
