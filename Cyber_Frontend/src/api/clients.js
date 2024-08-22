import { api } from "./axios";

export const getClientes = async (page = 1, rowsPerPage = 10) => {
  try {
    const response = await api.get(`/user?page=${page}&limit=${rowsPerPage}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const doAssignment = async (data) => {
  try {
    const response = await api.post("/assignment", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createClient = async (data) => {
  try {
    const response = await api.post("/user", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateClient = async (userID, data) => {
  try {
    const response = await api.put(`/user/${userID}`, data)
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
