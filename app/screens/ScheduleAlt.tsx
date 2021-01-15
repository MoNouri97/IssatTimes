import React, { useContext, useMemo } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import Card from '../components/Card';
import { ParamList } from '../types';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import AppBtn from '../components/AppBtn';
import color from '../config/color';
import { GroupContext } from '../context/Group/GroupContext';

const LoadingIndicator = () => <AppBtn>Loading . . .</AppBtn>;

const ScheduleAlt: React.FC<{ dayIndex: number }> = ({ dayIndex }) => {
	// context
	const { state } = useContext(SubjectsContext);
	const { group } = useContext(GroupContext);

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

	return (
		<View style={styles.container}>
			<FlatList
				ListEmptyComponent={LoadingIndicator}
				style={styles.list}
				data={groupData}
				keyExtractor={(item, index) => `${index}-${item.name}`}
				contentContainerStyle={styles.listContainer}
				renderItem={item => <Card {...item.item} />}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: color.bg,
		width: Dimensions.get('window').width,
		flex: 1,
	},
	list: {
		width: '100%',
	},
	listContainer: {
		padding: 20,
		paddingTop: 0,
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
