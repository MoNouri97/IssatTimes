import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import color from '../config/color';
import defaultStyles from '../config/defaultStyles';
import AppBtn from './AppBtn';
import AppText from './AppText';
import FormInput from './form/FormInput';
import { TodosContext } from '../context/Todos/TodosContext';
import TasksList from './TasksList';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
	day: number;
	subject: string;
}
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TasksModal: React.FC<Props> = ({ day, subject }) => {
	const [newTodo, setNewTodo] = useState('');
	const { state, dispatch } = useContext(TodosContext);
	const handleAdd = () => {
		dispatch!({
			type: 'ADD',
			payload: {
				todo: {
					id: state.todos.length + '',
					day: days[day],
					subject,
					done: false,
					name: newTodo,
				},
			},
		});
	};
	const handleDelete = (id: string) => {
		dispatch!({ type: 'DELETE', payload: { id } });
	};
	return (
		<View>
			<View style={styles.row}>
				<FormInput
					value={newTodo}
					setValue={setNewTodo}
					placeholder='Do Homework ...'
				/>
				<AppBtn style={styles.btn} onPress={handleAdd}>
					<Feather name='send' size={20} color={color.fg} />
				</AppBtn>
			</View>
			<TasksList
				title='Today'
				todos={state.todos.filter(val => val.day == days[day])}
				onDelete={handleDelete}
			/>
			<TasksList
				onDelete={handleDelete}
				title='All Tasks'
				todos={state.todos.filter(val => val.day != days[day])}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	btn: {
		backgroundColor: color.lighter,
		color: color.fg,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		marginLeft: 10,
		textAlign: 'center',
		padding: 15,
		marginVertical: 0,
	},
	row: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
});
export default TasksModal;
