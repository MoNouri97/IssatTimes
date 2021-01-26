import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import color from '../config/color';
import defaultStyles from '../config/defaultStyles';
import AppText from './AppText';

interface Props {
	onConfigPress: () => void;
}

const TopBar: React.FC<Props> = ({ onConfigPress }) => {
	return (
		<View style={styles.container}>
			<AppText style={defaultStyles.AppLogo}>ISSAT Times</AppText>
			<Pressable
				android_ripple={{ borderless: true, color: color.medium }}
				style={styles.groupName}
				onPress={() => {
					onConfigPress();
					// setGroup!({ id: '', name: '', subGroup: 1 });
					// dispatch!({ type: 'RESET' });
				}}
			>
				<MaterialIcons
					style={styles.icon}
					name='settings'
					size={24}
					color={color.fg}
				/>
			</Pressable>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: color.bg,
	},
	icon: {
		padding: 10,
	},
	title: { ...defaultStyles.AppLogo },
	groupName: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export default TopBar;
