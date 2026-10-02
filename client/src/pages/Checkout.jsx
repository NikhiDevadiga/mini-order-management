import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../services/paymentService";

const Checkout = () => {
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Create application order
      const orderResponse = await createOrder(deliveryAddress);

      const order = orderResponse.data;

      // Create Razorpay order
      const razorpayResponse = await createRazorpayOrder(order._id);

      const razorpayOrder = razorpayResponse.data;

      const options = {
        key: razorpayOrder.keyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Order Management System",
        description: "Order Payment",
        order_id: razorpayOrder.razorpayOrderId,

        handler: async (paymentResponse) => {
          try {
            await verifyRazorpayPayment({
              razorpay_order_id: paymentResponse.razorpay_order_id,

              razorpay_payment_id: paymentResponse.razorpay_payment_id,

              razorpay_signature: paymentResponse.razorpay_signature,

              orderId: order._id,
            });

            navigate("/my-orders");
          } catch (error) {
            setError(
              error.response?.data?.message || "Payment verification failed.",
            );

            setLoading(false);
          }
        },

        prefill: {
          name: "",
          email: "",
        },

        theme: {
          color: "#3399cc",
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to start payment.");

      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Delivery Address</label>

          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
