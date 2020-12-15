import { StyleProp, TextStyle } from 'react-native';
import color from './color';

export default {
	shadow: {
		elevation: 10,
		shadowColor: '#000',
		shadowOpacity: 0.3,
		shadowOffset: { width: 3, height: 3 },
		shadowRadius: 10,
	},
	AppLogo: {
		fontSize: 20,
		color: color.primary,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		width: '50%',
		textAlign: 'left',
		alignSelf: 'flex-start',
		padding: 10,
	} as any,
	title: {
		fontSize: 50,
		color: color.fg,
		fontWeight: 'bold',
	} as any,
};
