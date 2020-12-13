import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Card from '../components/Card';
import { ParamList } from '../types';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import AppBtn from '../components/AppBtn';
import { fetchHtml } from '../utils/fetchIssat';
import { getUpdateDate } from '../utils/getUpdateDate';
import { loadStateFromStorage } from '../utils/ManageAsyncStorage';
import { keys } from '../config/vars';

const LoadingIndicator = () => <AppBtn>Loading . . .</AppBtn>;

const ScheduleScreen: React.FC<
	MaterialTopTabScreenProps<ParamList, 'weekDay'>
> = ({ route }) => {
	// context
	const { state } = useContext(SubjectsContext);
	const groupData = useMemo(() => {
		console.log('----------------------------');

		if (!state.subjects) return [];
		let day = state.subjects[route.params.index];
		let secGrpIdx = 0;

		if (state?.subjects[route.params.index + 6]?.length) {
			day = day.map(subject => {
				// day x -> 2nd group day is x + 6
				const res = state.subjects![route.params.index + 6].find(
					({ time }, idx) => time == subject.time && idx >= secGrpIdx,
				);
				if (res) {
					console.log({ res, secGrpIdx });
					secGrpIdx++;
				}

				return res ? { ...res, name: res.name + '**(2)' } : subject;
			});
		}
		return day;
	}, [state.subjects]);

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
		// backgroundColor: 'dodgerblue',
		// backgroundColor: color.white,
		width: '100%',
	},
	list: {
		width: '100%',
	},
	listContainer: {
		padding: 20,
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
export default ScheduleScreen;
