import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import Card from '../components/Card';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import AppBtn from '../components/AppBtn';
import { theme } from '../config/color';
import { GroupContext } from '../context/Group/GroupContext';
import ModalScreen from './ModalScreen';
import defaultStyles from '../config/defaultStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamList } from '../types';
import { ThemeContext } from '../context/Theme/ThemeContext';
import AppText from '../components/AppText';

const LoadingIndicator = () => <AppBtn>Loading . . .</AppBtn>;

interface Props {
	dayIndex: number;
	haveTasks: boolean;
	navigation: StackNavigationProp<ParamList, 'Tabs'>;
}

const ScheduleAlt: React.FC<Props> = ({ dayIndex, haveTasks, navigation }) => {
	// context
	const { state } = useContext(SubjectsContext);
	const { group } = useContext(GroupContext);
	const [showModal, setShowModal] = useState(false);
	const [selected, setSelected] = useState('');

	const groupData = useMemo(() => {
		if (!state.subjects) return [];

		let day = state.subjects[dayIndex];
		let secGrpIdx = 0;

		// 1st group , nothing to do
		if (group?.subGroup == 1) {
			return day;
		}

		// 2nd group , need to account for 2nd group times
		if (state?.subjects[dayIndex + 6]?.length) {
			day = day.map(subject => {
				// day x -> 2nd group day is x + 6
				const res = state.subjects![dayIndex + 6].find(
					({ time }, idx) => time == subject.time && idx >= secGrpIdx,
				);
				if (res) {
					secGrpIdx++;
				}

				return res ? { ...res, name: res.name + ' (G2)' } : subject;
			});
		}
		return day;
	}, [state.subjects, group]);

	const handleSelect = useCallback(
		(selectedSubj: string) => {
			navigation.navigate('Modal', { day: dayIndex, subject: selectedSubj });
			// setSelected(selected);
			// setShowModal(!showModal);
			// console.log(showModal);
		},
		[setSelected, setShowModal, showModal],
	);
	const themeCon = useContext(ThemeContext);
	const color = useMemo(
		() => (themeCon.theme == 'dark' ? theme.darkTheme : theme.lightTheme),
		[themeCon],
	);
	return (
		<View style={[styles.container, { backgroundColor: color.bg }]}>
			<ModalScreen
				info={{ day: dayIndex, subject: selected }}
				visible={showModal}
				onRequestClose={() => setShowModal(false)}
			/>
			<FlatList
				ListEmptyComponent={LoadingIndicator}
				style={styles.list}
				data={groupData}
				keyExtractor={(item, index) => `${index}-${item.name}`}
				contentContainerStyle={styles.listContainer}
				renderItem={item => (
					<Card
						// bubble={haveTasks ? subjectWithTasks[item.index] : false}
						{...item.item}
						onPress={handleSelect}
					/>
				)}
			/>
			{haveTasks && (
				<AppBtn style={styles.tasksAlert} onPress={() => handleSelect('')}>
					<AppText style={{ color: theme.darkTheme.fg }}> View Tasks</AppText>
				</AppBtn>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	tasksAlert: {
		margin: 10,
		position: 'absolute',
		bottom: 0,
		width: '50%',
		backgroundColor: 'tomato',
		borderRadius: 10,
		...defaultStyles.shadow,
	},
	container: {
		width: Dimensions.get('window').width,
		flex: 1,
		alignItems: 'center',
	},
	list: {
		width: '100%',
	},
	listContainer: {
		padding: 20,
		paddingTop: 5,
	},
	title: {
		fontSize: 50,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		width: '50%',
		textAlign: 'left',
		alignSelf: 'flex-start',
		padding: 10,
	},
});
export default ScheduleAlt;
