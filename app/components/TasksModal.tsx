import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import color from '../config/color';
import defaultStyles from '../config/defaultStyles';
import AppBtn from './AppBtn';
import AppText from './AppText';
import FormInput from './form/FormInput';
import { TodosContext } from '../context/Todos/TodosContext';

interface Props {
	day: number;
	subject: string;
}
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TasksModal: React.FC<Props> = ({ day, subject }) => {
	const [newTodo, setNewTodo] = useState(`${day} ${subject}`);
	const { state, dispatch } = useContext(TodosContext);
	const handleAdd = () => {
		dispatch!({
			type: 'ADD',
			payload: {
				todo: {
					id: '1',
					day: days[day],
					subject,
					done: false,
					name: newTodo,
				},
			},
		});
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
			<AppText style={defaultStyles.title}>Tasks</AppText>

			{state.todos.map((todo, i) => (
				<View key={i}>
					<AppText>{todo.day}</AppText>
					<AppText>{todo.subject}</AppText>
					<AppText>{todo.name}</AppText>
				</View>
			))}
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
		padding: 20,
		marginVertical: 0,
	},
	row: {
		flexDirection: 'row',
		width: '100%',
		height: 70,
		alignItems: 'stretch',
		justifyContent: 'space-between',
	},
});
export default TasksModal;
