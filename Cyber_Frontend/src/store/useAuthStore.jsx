import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { login, signup } from '../api/auth';

export const useAuthStore = create(
	persist(
		(set) => ({
			user: null,
			token: null,
			onLogin: async (data) => {
				const { user, token } = await login(data);
				set({ user, token });
			},
			onSignup: async (data) => {
				await signup(data);
			},
			onLogout: () => {
				set({ user: null, token: null });
			},
		}),
		{
			name: 'auth-storage',
		}
	)
);