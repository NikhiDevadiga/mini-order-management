import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stockQuantity: "",
      image: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stockQuantity: Number(formData.stockQuantity),
      };

      if (editingId) {
        await updateProduct(editingId, productData);
        setSuccess("Product updated successfully.");
      } else {
        await createProduct(productData);
        setSuccess("Product created successfully.");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save product.");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stockQuantity: product.stockQuantity,
      image: product.image || "",
    });

    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      setSuccess("");

      await deleteProduct(id);

      setSuccess("Product deleted successfully.");

      fetchProducts();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <div className="admin-products-page">
      <h1>Admin Products</h1>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="product-form-card">
        <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div>
            <label>Image</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit">
              {editingId ? "Update Product" : "Add Product"}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="products-section">
        <h2>Products</h2>

        {loading && <p>Loading products...</p>}

        {!loading && products.length === 0 && <p>No products found.</p>}

        {!loading &&
          products.map((product) => (
            <div className="admin-product-card" key={product._id}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <div className="product-details">
                  <span>
                    <strong>Category:</strong> {product.category}
                  </span>

                  <span>
                    <strong>Price:</strong> ₹{product.price}
                  </span>

                  <span>
                    <strong>Stock:</strong> {product.stockQuantity}
                  </span>
                </div>
              </div>

              <div className="product-actions">
                <button onClick={() => handleEdit(product)}>Edit</button>

                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminProducts;
