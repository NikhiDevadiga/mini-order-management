import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProducts({
        search,
        category,
      });

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = () => {
    fetchProducts();
  };

  return (
    <div>
      <h1>Products</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              )}

              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <p className="product-price">₹{product.price}</p>

              <p className="product-stock">Stock: {product.stockQuantity}</p>

              <Link to={`/products/${product._id}`}>View Details →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
