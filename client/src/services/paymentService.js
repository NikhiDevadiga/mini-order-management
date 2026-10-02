import api from "./api";

export const createRazorpayOrder = async (orderId) => {
  const response = await api.post("/payments/create-order", {
    orderId,
  });

  return response.data;
};

export const verifyRazorpayPayment = async (paymentData) => {
  const response = await api.post("/payments/verify", paymentData);

  return response.data;
};

export const getPaymentByOrder = async (orderId) => {
  const response = await api.get(`/payments/${orderId}`);

  return response.data;
};
