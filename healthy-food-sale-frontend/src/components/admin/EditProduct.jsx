import { useState } from "react";
import API from "../../services/api.js";
import { getToken } from "../../services/authService.js";

export default function EditProduct({
  selectedProduct,
  reload,
  clearSelection,
}) {
  const createFormData = (product) => ({
    name: product?.name || "",
    type: product?.type || "fruit",
    price: product?.price || "",
    harvestDate: product?.harvestDate
      ? new Date(product.harvestDate).toISOString().split("T")[0]
      : "",
    expiryDate: product?.expiryDate
      ? new Date(product.expiryDate).toISOString().split("T")[0]
      : "",
    description: product?.description || "",
  });

  // Initialize directly from selectedProduct
  const [form, setForm] = useState(createFormData(selectedProduct));

  // Handle form changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${selectedProduct._id}`, form, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      alert("Product updated successfully");

      reload();
      clearSelection();
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  // If no product selected
  if (!selectedProduct) {
    return (
      <div>
        <h3>Select a product to edit</h3>
      </div>
    );
  }

  return (
    <div key={selectedProduct._id}>
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* Product Type */}
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
        </select>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* Harvest Date */}
        <input
          type="date"
          name="harvestDate"
          value={form.harvestDate}
          onChange={handleChange}
        />

        {/* Expiry Date */}
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        {/* Buttons */}
        <button type="submit">Update Product</button>

        <button type="button" onClick={clearSelection}>
          Cancel
        </button>
      </form>
    </div>
  );
}
