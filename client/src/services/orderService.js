import api from "./api";

export const createOrder = async (deliveryAddress) => {
  const response = await api.post("/orders", {
    deliveryAddress,
  });

  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");

  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);

  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/admin/orders");

  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/orders/${id}/status`, { status });

  return response.data;
};
