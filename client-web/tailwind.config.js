/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				darkBlue: '#002865',
				primaryBlue: '#3b82f6',
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
