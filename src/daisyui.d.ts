declare module 'daisyui/src/colors/index.js' {
	// The value can also be a string, ignore them as they are filtered
	const colors: Record<string, (options: {opacityValue?: string}) => string>
	export default colors
}

declare module 'daisyui/src/colors/themes.js' {
	// This is directly passed to injectThemes, so we don't care much about
	// typing.
	const themes: any
	export default themes
}

declare module 'daisyui/src/colors/functions.js' {
	// We don't care about return type for now
	const injectThemes: (
		addBase: (css: Record<string, Record<string, string>>) => void,
		config: any,
		themes: Array<Record<string, Record<string, string>> | string> | boolean,
	) => void
	export {injectThemes}
}
