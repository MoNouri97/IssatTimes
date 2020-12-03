import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Card from '../components/Card';
import { ParamList } from '../types';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { SubjectsContext } from '../context/Subjects/SubjectsContext';
import AppBtn from '../components/AppBtn';

const LoadingIndicator = () => <AppBtn>Loading . . .</AppBtn>;
const ScheduleScreen: React.FC<
	MaterialTopTabScreenProps<ParamList, 'weekDay'>
> = ({ route }) => {
	// context
	const { state } = useContext(SubjectsContext);

	return (
		<View style={styles.container}>
			<FlatList
				ListEmptyComponent={LoadingIndicator}
				style={styles.list}
				data={state.subjects[route.params.index]}
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
