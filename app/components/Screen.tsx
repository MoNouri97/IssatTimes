import React from 'react';
import {
	Platform,
	SafeAreaView,
	StatusBar,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from 'react-native';

interface Props {
	style?: StyleProp<ViewStyle>;
}

const Screen: React.FC<Props> = ({ children, style }) => {
	return (
		<SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
	},
});
export default Screen;
