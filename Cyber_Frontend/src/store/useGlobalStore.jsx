import { create } from 'zustand';

export const useGlobalStore = create((set) => ({
	// Subject
	selectedSubject: null,
	setSelectedSubject: (subject) => {
		set({ selectedSubject: subject });
	},

	// Snackbar
	snackbar: {
		open: false,
		message: '',
		color: 'primary',
		variant: 'soft',
	},
	openSnackbar: (message = '', color = 'primary', variant = 'soft') => {
		set({ snackbar: { open: true, message, color, variant } });
	},
	closeSnackbar: () => {
		set({
			snackbar: { open: false, message: '', color: 'primary', variant: 'soft' },
		});
	},
}));