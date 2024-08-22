import { api } from "./axios";

export const getClientes = async (data) => {
	try {
		const response = await api.get('/user?page=1&limit=10', data);
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export const doAssignment = async () => {
	try {
		const response = await api.post('/assignment', data);
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};