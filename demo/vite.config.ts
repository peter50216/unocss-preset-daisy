import {defineConfig} from 'vite'
// eslint-disable-next-line n/file-extension-in-import
import unocss from 'unocss/vite'
import {presetUno, presetIcons, transformerDirectives} from 'unocss'
import presetDaisy from '../index.js'

export default defineConfig({
	plugins: [
		unocss({
			transformers: [transformerDirectives()],
			presets: [
				presetUno(),
				presetDaisy({
					themes: [
						'light',
						'dark',
						{
							mytheme: {
								primary: '#a991f7',
								secondary: '#f6d860',
								accent: '#37cdbe',
								neutral: '#3d4451',
								'base-100': '#ffffff',
							},
						},
					],
				}),
				presetIcons(),
			],
		}),
	],
})
