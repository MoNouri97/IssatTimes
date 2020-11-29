import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import faker from 'faker';
import Card from '../components/Card';
import Screen from '../components/Screen';
import { Subject } from '../types';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { SubjectsContext } from '../context/SubjectsContext';
import AppBtn from '../components/AppBtn';
import { initState } from '../context/useSubjectsState';
import WebScrap from '../components/WebScrap';

type ParamList = {
	weekDay: { index: number };
};
const ScheduleScreen: React.FC<
	MaterialTopTabScreenProps<ParamList, 'weekDay'>
> = ({ route }) => {
	const { subjects, setSubjects } = useContext(SubjectsContext);
	return (
		<View style={styles.container}>
			<FlatList
				ListEmptyComponent={() => <AppBtn>Loading . . .</AppBtn>}
				style={styles.list}
				data={subjects[route.params.index]}
				keyExtractor={item => `${item.time}-${item.name}`}
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
