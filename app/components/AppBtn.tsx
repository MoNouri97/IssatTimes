import React from 'react';
import {
	GestureResponderEvent,
	Pressable,
	StyleProp,
	StyleSheet,
	TouchableOpacity,
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
	const btnStyle: StyleProp<ViewStyle> = {
		...styles.btn,
		backgroundColor: primary ? color.primary : color.secondary,
	};

	return (
		<Pressable
			style={[btnStyle, style]}
			onPress={onPress}
			android_ripple={{ borderless: false, color: color.lighter }}
		>
			{children}
		</Pressable>
	);
};
const styles = StyleSheet.create({
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		marginVertical: 10,
		padding: 10,
		// elevation: 10,
	},
	text: {
		color: color.lighter,
		fontSize: 15,
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
});
export default AppBtn;
