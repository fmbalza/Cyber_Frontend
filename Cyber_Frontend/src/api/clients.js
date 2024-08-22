import { api } from "./axios";

export const getClientes = async () => {
  try {
    const response = await api.get("/user");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getAllAsignments = async (rowsPerPage, page) => {
  try {
    const response = await api.get(`/assignment?limit=${rowsPerPage}&page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

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

export const deleteClient = async (userID) => {
  try {
    const { data } = await api.delete(`/user/${userID}`);
    return data.message;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
