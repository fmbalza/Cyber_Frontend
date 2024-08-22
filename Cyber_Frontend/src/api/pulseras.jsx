import { api } from "./axios";

export const getPulseras = async () => {
	try {
		const response = await api.get('/bracelet');
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export const createPulsera = async () => {
	try {
		const response = await api.post('/bracelet');
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export const createPulsera = async () => {
	try {
		const response = await api.post('/bracelet');
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

