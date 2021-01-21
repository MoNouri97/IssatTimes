import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import color from '../config/color';
import defaultStyles from '../config/defaultStyles';
import { Todo } from '../types';
import AppBtn from './AppBtn';
import AppText from './AppText';

interface Props {
	todos: Todo[];
	title: string;
	onDelete: (id: string) => void;
}

const TasksList: React.FC<Props> = ({ todos, title, onDelete }) => {
	return (
		<>
			<AppText style={styles.title}>{title}</AppText>

			<View
				style={{
					flexDirection: 'column-reverse',
				}}
			>
				{!todos.length ? (
					<AppText style={{ padding: 10 }}>Nothing To Do ... </AppText>
				) : (
					todos.map((todo, i) => (
						<View key={i} style={styles.todoItem}>
							<AppText style={{ flex: 1 }}>{todo.name}</AppText>
							<AppText>| {todo.day}</AppText>
							<AppText>-{todo.subject}</AppText>
							<AppBtn style={styles.btn} onPress={() => onDelete(todo.id)}>
								<Feather name='trash' size={15} color={color.fg} />
							</AppBtn>
						</View>
					))
				)}
			</View>
		</>
	);
};
const styles = StyleSheet.create({
	todoItem: {
		backgroundColor: color.lighter,
		borderRadius: 5,
		overflow: 'hidden',
		marginVertical: 5,
		paddingLeft: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	btn: {
		backgroundColor: color.lighter,
		padding: 15,
		borderLeftWidth: 4,
		borderColor: color.bg,
		borderRadius: 0,
		marginLeft: 5,
	},
	title: {
		fontSize: 20,
		fontFamily: 'Lato_900Black',

		marginTop: 10,
	},
});
export default TasksList;
