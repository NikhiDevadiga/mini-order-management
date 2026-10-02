import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleAddToCart = async () => {
    try {
      await addItem(product._id, 1);
      alert("Product added to cart.");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product to cart.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProductById(id);

        setProduct(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>

      {product.image && (
        <img src={product.image} alt={product.name} width="300" />
      )}

      <p>{product.description}</p>

      <p>Category: {product.category}</p>

      <p>Price: ₹{product.price}</p>

      <p>Stock: {product.stockQuantity}</p>
      {product.stockQuantity > 0 ? (
        <button onClick={handleAddToCart}>Add to Cart</button>
      ) : (
        <p>Out of stock</p>
      )}
    </div>
  );
};

export default ProductDetails;
