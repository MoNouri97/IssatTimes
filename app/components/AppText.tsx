import React, { useContext, useMemo } from 'react';
import { Platform, StyleSheet, Text, TextProps } from 'react-native';
import { theme } from '../config/color';
import { ThemeContext } from '../context/Theme/ThemeContext';

const AppText: React.FC<TextProps> = ({ children, style, ...props }) => {
	const themeCon = useContext(ThemeContext);
	const color = useMemo(
		() => (themeCon.theme == 'dark' ? theme.darkTheme : theme.lightTheme),
		[themeCon],
	);
	return (
		<Text {...props} style={[{ color: color.fg }, styles.text, style]}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
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
