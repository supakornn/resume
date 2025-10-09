/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Georgia', 'Times New Roman', 'serif']
			},
			screens: {
				print: { raw: 'print' }
			}
		}
	},

	plugins: []
};

module.exports = config;
