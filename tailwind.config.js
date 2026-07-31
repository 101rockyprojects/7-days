/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				felipa: ['Felipa', 'cursive'],
				script: ['Qwitcher Grypen', 'cursive'],
				uncial: ['Uncial Antiqua', 'cursive'],
				cinzel: ['Cinzel', 'serif'],
				pixel: ['Geist Pixel', 'Bitcount Single', 'monospace'],
				legible: ['Atkinson Hyperlegible', 'sans-serif'],
				slackey: ['Slackey', 'cursive'],
				bartle: ['"BBH Bartle"', 'serif'],
				bogle: ['"BBH Bogle"', 'serif'],
				'grid-single': ['"Bitcount Grid Single"', 'monospace'],
				'geist-mono': ['"Geist Mono"', 'monospace'],
				girassol: ['Girassol', 'cursive'],
				manrope: ['Manrope', 'sans-serif']
			},
			colors: {
				'soft-black': '#0a0a0a',
				'deep-bordeaux': '#2b0d0d',
				'accent-gold': '#AC8400',
				cream: '#D2CFA0',
				'crimson-red': '#CC0000',
				'dark-sepia': '#1A1410',
				'warm-beige': '#F5F0E1',
				bordeaux: '#722F37',
				'velvet-red': '#4A0404',
			},
			animation: {
				'shake': 'shake 0.5s ease-in-out',
				'print': 'thermalPrint 0.3s ease-out forwards',
				'perspective-right': 'perspectiveRight 0.8s ease-out forwards',
				'perspective-left': 'perspectiveLeft 0.6s ease-in-out',
				'zoom-in': 'zoomIn 0.4s ease-out 0.8s forwards',
				'zoom-in-down': 'zoomInDown 0.6s ease-out 1.2s forwards',
			},
			keyframes: {
				shake: {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
				},
				thermalPrint: {
					'0%': { clipPath: 'inset(0 100% 0 0)', opacity: '0' },
					'100%': { clipPath: 'inset(0 0 0 0)', opacity: '1' },
				},
				perspectiveRight: {
					'0%': { transform: 'perspective(800px) rotateY(0deg)' },
					'100%': { transform: 'perspective(800px) rotateY(-90deg)' },
				},
				perspectiveLeft: {
					'0%': { transform: 'perspective(800px) rotateY(0deg)' },
					'100%': { transform: 'perspective(800px) rotateY(180deg)' },
				},
				zoomIn: {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				zoomInDown: {
					'0%': { transform: 'translateY(-50px) scale(0.8)', opacity: '0' },
					'100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
				},
			},
		},
	},
	plugins: [],
};
