import { DefaultTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AppBtn from '../components/AppBtn';
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import color from '../config/color';
import { fonts, keys } from '../config/vars';
import { GroupContext } from '../context/Group/GroupContext';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import { ParamList } from '../types';
import { displayDate } from '../utils/displayDate';
import { loadStateFromStorage } from '../utils/ManageAsyncStorage';

interface Props {
	navigation: StackNavigationProp<ParamList, 'Settings'>;
}
const settingsScreen: React.FC<Props> = ({ navigation }) => {
	const { group, setGroup } = useContext(GroupContext);
	const { dispatch } = useContext(SubjectsContext);
	const [subGroup, setSubGroup] = useState(group?.subGroup!);
	const [lastUpdate, setLastUpdate] = useState<string>();

	const toggleSubGroup = () => {
		setSubGroup(subGroup == 1 ? 2 : 1);
	};
	const handleChangeGroup = () => {
		navigation.navigate('SelectGroup');
		// setGroup!({ id: '', name: '', subGroup: 1 });
	};
	useEffect(() => {
		setGroup!({ ...group!, subGroup });
	}, [subGroup]);

	useEffect(() => {
		let canUpdate = true;
		loadStateFromStorage<string>(keys.LAST_UPDATE).then(update => {
			if (!canUpdate) return;
			setLastUpdate(update ?? undefined);
		});
		return () => {
			canUpdate = false;
		};
	}, [setLastUpdate]);

	return (
		<AppScreen style={styles.container}>
			<AppText style={styles.header}>Group Info</AppText>
			<View style={styles.row}>
				<AppText>Sub-Group</AppText>
				<AppBtn
					onPress={toggleSubGroup}
					style={styles.subBtn}
					innerStyle={styles.inner}
				>
					<AppText>{subGroup}</AppText>
				</AppBtn>
			</View>
			<View style={styles.row}>
				<AppText>Group</AppText>
				<AppText style={styles.subText}>{group?.name}</AppText>
				<AppBtn
					onPress={handleChangeGroup}
					style={styles.subBtn}
					innerStyle={styles.inner}
				>
					<AppText>Change</AppText>
				</AppBtn>
			</View>
			<AppText style={styles.header}>Data</AppText>
			<View style={styles.row}>
				<AppText>Latest Modification</AppText>
				<AppText style={styles.subText}>
					{lastUpdate && displayDate(new Date(lastUpdate))}
				</AppText>
			</View>
		</AppScreen>
	);
};
const styles = StyleSheet.create({
	subText: { fontFamily: fonts.light, fontSize: 15 },
	inner: { paddingVertical: 20, paddingHorizontal: 20 },
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
		padding: 10,
		minHeight: 60,
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
	},
});
export default settingsScreen;
