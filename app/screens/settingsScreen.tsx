import { DefaultTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AppBtn from '../components/AppBtn';
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import color from '../config/color';
import { GroupContext } from '../context/Group/GroupContext';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';

interface Props {}

const settingsScreen: React.FC<Props> = ({}) => {
	const { group, setGroup } = useContext(GroupContext);
	const { dispatch } = useContext(SubjectsContext);
	const [subGroup, setSubGroup] = useState(group?.subGroup!);

	// const [subGroup, setSubGroup] = useState<1 | 2>(() => group?.subGroup || 1);

	const toggleSubGroup = () => {
		setSubGroup(subGroup == 1 ? 2 : 1);
	};
	const handleChangeGroup = () => {
		setGroup!({ id: '', name: '', subGroup: 1 });
	};
	useEffect(() => {
		setGroup!({ ...group!, subGroup });
	}, [subGroup]);

	return (
		<AppScreen style={styles.container}>
			<AppText style={styles.header}>Group Info</AppText>
			<View style={styles.row}>
				<AppText>Sub-Group</AppText>
				<AppBtn onPress={toggleSubGroup} style={styles.subBtn}>
					<AppText>{subGroup}</AppText>
				</AppBtn>
			</View>
			<View style={styles.row}>
				<AppText>Group</AppText>
				<AppText>{group?.name}</AppText>
				<AppBtn onPress={handleChangeGroup} style={styles.subBtn}>
					<AppText>Change</AppText>
				</AppBtn>
			</View>
		</AppScreen>
	);
};
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	header: {
		fontSize: 20,
		padding: 10,
	},
	row: {
		backgroundColor: color.lighter,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 2,
		paddingHorizontal: 10,
	},
	subBtn: {
		backgroundColor: color.bg,
		color: color.fg,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		marginLeft: 10,
		// minWidth: 70,
		textAlign: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
});
export default settingsScreen;
