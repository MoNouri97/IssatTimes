import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import color from '../config/color';
import AppText from './AppText';

interface Props {}

const TopBar: React.FC<Props> = ({}) => {
	return (
		<View style={styles.container}>
			<AppText style={styles.title}>ISSAT Times</AppText>
			<AppText>FIA03-GL02</AppText>
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
	title: {
		fontSize: 20,
		color: color.primary,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		width: '50%',
		textAlign: 'left',
		alignSelf: 'flex-start',
		padding: 10,
	},
});
export default TopBar;
