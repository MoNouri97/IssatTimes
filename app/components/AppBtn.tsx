import React from 'react';
import {
	GestureResponderEvent,
	Pressable,
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';
import color from '../config/color';
import AppText from './AppText';

interface Props {
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	style?: StyleProp<ViewStyle>;
	innerStyle?: StyleProp<ViewStyle>;
}

const AppBtn: React.FC<Props> = ({ children, innerStyle, onPress, style }) => {
	return (
		<View style={[style, { overflow: 'hidden', padding: 0 }]}>
			<Pressable
				style={[styles.btn, innerStyle]}
				onPress={onPress}
				android_ripple={{ borderless: false, color: color.fg }}
			>
				<AppText>{children}</AppText>
			</Pressable>
		</View>
	);
};
const styles = StyleSheet.create({
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		overflow: 'hidden',
		flex: 1,
	},
	text: {
		color: color.lighter,
		fontSize: 15,
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
});
export default AppBtn;
