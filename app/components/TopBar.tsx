import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import color from '../config/color';
import defaultStyles from '../config/defaultStyles';
import { GroupContext } from '../context/Group/GroupContext';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import AppBtn from './AppBtn';
import AppText from './AppText';

interface Props {}

const TopBar: React.FC<Props> = ({}) => {
	const { group, setGroup } = useContext(GroupContext);
	const { dispatch } = useContext(SubjectsContext);
	return (
		<View style={styles.container}>
			<AppText style={styles.title}>ISSAT Times</AppText>
			<TouchableOpacity
				style={styles.groupName}
				onPress={() => {
					setGroup!({ id: '', name: '' });
					dispatch!({ type: 'RESET' });
				}}
			>
				<AppText>{group?.name}</AppText>
				<Feather name='edit' size={15} />
			</TouchableOpacity>
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
	title: { ...defaultStyles.AppLogo },
	groupName: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
export default TopBar;
