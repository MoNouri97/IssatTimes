import color from './color';

export const keys = {
	LAST_UPDATE: 'lastUpdate',
	SUBJECTS: 'subjects',
	GROUP: 'group',
	TODOS: 'todos',
	THEME: 'theme',
};
export const fonts = {
	light: 'Lato_300Light',
	regular: 'Lato_400Regular',
	bold: 'Lato_900Black',
};
export const MyTheme = {
	dark: true,
	colors: {
		primary: color.primary,
		background: color.bg,
		card: color.bg,
		text: color.fg,
		border: color.bg,
		notification: color.primary,
	},
};
export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const daysLong = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];
