import React from 'react';
import { Platform, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

interface Props {
	style?: StyleProp<TextStyle> | undefined;
}
const AppText: React.FC<Props> = ({ children, style = {} }) => {
	return <Text style={[styles.text, style]}>{children} </Text>;
};

const styles = StyleSheet.create({
	text: {
		...Platform.select({
			android: {
				fontSize: 18,
				fontFamily: 'Roboto',
			},
			ios: {
				fontSize: 20,
				fontFamily: 'Avenir',
			},
		}),
	},
});

export default AppText;
