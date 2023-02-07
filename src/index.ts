import type {Preset} from 'unocss'
import camelCase from 'camelcase'
import colors from 'daisyui/src/colors/index.js'
import functions from 'daisyui/src/colors/functions.js'
import allThemes from 'daisyui/src/colors/themes.js'

const colorEntries = Object.entries(colors)

type Theme = Record<string, Record<string, string>>

interface CSSBlock {
	[key: string]: string | CSSBlock
}

const toCSS = (css: CSSBlock): string => {
	return Object.entries(css)
		.map(([k, v]) => {
			if (typeof v === 'string') {
				if (k.startsWith('--')) {
					v = v.replace(/ /g, ',')
				}
				return `${k}: ${v};`
			} else {
				return `${k} {${toCSS(v)}}`
			}
		})
		.join(' ')
}

const presetDaisy = ({
	themes,
}: {themes?: Array<Theme | string> | boolean} = {}): Preset => {
	const configFn = (key: string) => {
		if (key === 'daisyui.themes') {
			return themes
		}
		return undefined
	}
	const baseEntries: CSSBlock[] = []
	const addBase = (css: CSSBlock) => {
		baseEntries.push(css)
	}
	functions.injectThemes(addBase, configFn, allThemes)
	return {
		name: 'daisy',
		theme: {
			colors: {
				...Object.fromEntries(
					colorEntries
						.filter(
							([color]) =>
								// Already in preset-mini
								// https://github.com/unocss/unocss/blob/0f7efcba592e71d81fbb295332b27e6894a0b4fa/packages/preset-mini/src/_theme/colors.ts#L11-L12
								!['transparent', 'current'].includes(color) &&
								// Added below
								!color.startsWith('base'),
						)
						.map(([color, value]) => [camelCase(color), value({})]),
				),
				base: Object.fromEntries(
					colorEntries
						.filter(([color]) => color.startsWith('base'))
						.map(([color, value]) => [color.replace('base-', ''), value({})]),
				),
			},
		},
		rules: [
			[
				/^rounded-(?:box|btn|badge)$/,
				([name]) => ({'border-radius': `var(--${name!})`}),
			],
		],
		preflights: [
			{
				getCSS: () => {
					return baseEntries.map((b) => toCSS(b)).join('\n')
				},
			},
		],
	}
}

export default presetDaisy
