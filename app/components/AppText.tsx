import React from 'react';
import { Platform, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';
import color from '../config/color';
import { AppLoading } from 'expo';

interface Props {
	style?: StyleProp<TextStyle> | undefined;
}
const AppText: React.FC<Props> = ({ children, style = {} }) => {
	return <Text style={[styles.text, style]}>{children} </Text>;
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
