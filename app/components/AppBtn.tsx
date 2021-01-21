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
	primary?: boolean;
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
	style?: StyleProp<ViewStyle>;
}

const AppBtn: React.FC<Props> = ({
	children,
	primary = false,
	onPress,
	style,
}) => {
	return (
		<Pressable
			style={[
				styles.btn,
				{ backgroundColor: primary ? color.primary : color.secondary },
				style,
			]}
			onPress={onPress}
			android_ripple={{ borderless: false, color: color.fg }}
		>
			<AppText>{children}</AppText>
		</Pressable>
	);
};
const styles = StyleSheet.create({
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		overflow: 'hidden',
	},
	text: {
		color: color.lighter,
		fontSize: 15,
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
});
export default AppBtn;
