import api from "./api";

export const getCustomerDashboard = async () => {
  const response = await api.get("/dashboard/customer");
  return response.data;
};

export const getAdminDashboard = async () => {
  const response = await api.get("/dashboard/admin");
  return response.data;
};
