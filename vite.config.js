import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const manifestOptions = {
	name: '7 Wonders Duel Scoring',
	short_name: '7WD Scoring',
	description: 'Calculate your 7 Wonders Duel scores.',
	theme_color: '#ffffff',
	icons: [
		{
			src: 'pwa-192x192.png',
			sizes: '192x192',
			type: 'image/png'
		},
		{
			src: 'pwa-512x512.png',
			sizes: '512x512',
			type: 'image/png'
		}
	]
};

const pWAConfig = {
	manifest: manifestOptions,
	minify: false,
	registerType: 'autoUpdate'
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VitePWA(pWAConfig)
	],
	base: "",
})

