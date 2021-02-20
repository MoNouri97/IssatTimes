import { Feather } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../config/color';
import { days, daysLong } from '../config/vars';
import { ThemeContext } from '../context/Theme/ThemeContext';
import { TodosContext } from '../context/Todos/TodosContext';
import { ParamList } from '../types';
import AppBtn from './AppBtn';
import AppText from './AppText';
import FormInput from './form/FormInput';
import TasksList from './TasksList';

interface Props {
	day: number;
	subject: string;
	navigation: StackNavigationProp<ParamList, 'Modal'>;
	route: RouteProp<ParamList, 'Modal'>;
}

const TasksModal: React.FC<Props> = ({ day, subject, navigation, route }) => {
	const [newTodo, setNewTodo] = useState('');
	const [info] = useState({
		day: day ?? route.params.day,
		subject: subject ?? route.params.subject,
	});
	const {
		state: { todos },
		dispatch,
	} = useContext(TodosContext);
	const handleAdd = () => {
		if (newTodo.trim().length == 0) {
			return;
		}
		const newId = todos.length ? parseInt(todos[todos.length - 1].id) + 1 : 0;
		dispatch!({
			type: 'ADD',
			payload: {
				todo: {
					id: `${newId}`,
					day: days[info.day],
					subject: info.subject,
					done: false,
					name: newTodo,
				},
			},
		});
		setNewTodo('');
	};
	const handleDelete = (id: string) => {
		dispatch!({ type: 'DELETE', payload: { id } });
	};
	const themeCon = useContext(ThemeContext);
	const color = useMemo(
		() => (themeCon.theme == 'dark' ? theme.darkTheme : theme.lightTheme),
		[themeCon],
	);
	return (
		<View style={styles.container}>
			<AppText style={styles.header}>
				{info.subject ? 'Add A Task' : 'View Tasks'}
			</AppText>
			{info.subject !== '' && (
				<>
					<AppText style={styles.title}>
						{daysLong[info.day]}-{info.subject}
					</AppText>
					<View style={styles.row}>
						<FormInput
							value={newTodo}
							setValue={setNewTodo}
							placeholder='Do Homework ...'
						/>
						<AppBtn
							style={styles.outerBtn}
							innerStyle={[styles.btn, { backgroundColor: color.lighter }]}
							onPress={handleAdd}
						>
							<Feather name='send' size={20} color={color.fg} />
						</AppBtn>
					</View>
				</>
			)}
			<AppText style={styles.title}>Tasks For {daysLong[info.day]}</AppText>
			<TasksList
				todos={todos.filter(val => val.day == days[info.day])}
				onDelete={handleDelete}
			/>
			<AppText style={styles.title}>All Tasks</AppText>
			<TasksList
				onDelete={handleDelete}
				todos={todos.filter(val => val.day != days[info.day])}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		padding: 27,
	},
	outerBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		marginLeft: 5,
	},
	btn: {
		textAlign: 'center',
		padding: 15,
	},
	row: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	title: {
		fontSize: 20,
		fontFamily: 'Lato_900Black',

		marginVertical: 10,
	},
	header: {
		fontSize: 40,
		fontFamily: 'Lato_900Black',
		marginBottom: 20,
	},
});
export default TasksModal;
