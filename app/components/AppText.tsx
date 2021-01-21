import React from 'react';
import { Platform, StyleSheet, Text, TextProps } from 'react-native';
import color from '../config/color';

const AppText: React.FC<TextProps> = ({ children, style, ...props }) => {
	return (
		<Text {...props} style={[styles.text, style]}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		color: color.fg,
		...Platform.select({
			android: {
				fontSize: 18,
				fontFamily: 'Lato_400Regular',
				// fontFamily: 'Roboto',
			},
			ios: {
				fontSize: 20,
				fontFamily: 'Lato_400Regular',
				// fontFamily: 'Avenir',
			},
		}),
	},
});

export default AppText;
