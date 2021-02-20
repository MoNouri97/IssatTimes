import React, { useContext, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../config/color';
import defaultStyles from '../config/defaultStyles';
import AppText from './AppText';
import { ThemeContext } from '../context/Theme/ThemeContext';

interface Props {
	onConfigPress: () => void;
}

const TopBar: React.FC<Props> = ({ onConfigPress }) => {
	const themeCon = useContext(ThemeContext);
	const color = useMemo(
		() => (themeCon.theme == 'dark' ? theme.darkTheme : theme.lightTheme),
		[themeCon],
	);
	return (
		<View style={[styles.container, { backgroundColor: color.bg }]}>
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
