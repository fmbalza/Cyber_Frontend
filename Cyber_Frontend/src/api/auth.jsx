import { authApi } from './axios';

export const login = async (data) => {
	try {
		const response = await authApi.post('/login', data);
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};

export const signup = async (data) => {
	try {
		const response = await authApi.post('/signup', {
			...data,
			role: 'user',
		});
		return response.data.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};