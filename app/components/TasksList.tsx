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
	onDelete: (id: string) => void;
}

const TasksList: React.FC<Props> = ({ todos, onDelete }) => {
	return (
		<>
			<View
				style={{
					flexDirection: 'column-reverse',
				}}
			>
				{!todos.length ? (
					<AppText style={{ padding: 10 }}>Nothing To Do ... </AppText>
				) : (
					todos.map(todo => (
						<View key={todo.id} style={styles.todoItem}>
							<AppText numberOfLines={1} style={{ flex: 1 }}>
								{todo.name}
							</AppText>
							<AppText style={styles.lightTxt}>
								| {todo.day}-{todo.subject}
							</AppText>
							<AppBtn
								style={styles.btn}
								innerStyle={styles.innerBtn}
								onPress={() => onDelete(todo.id)}
							>
								<Feather name='check' size={20} color={color.fg} />
							</AppBtn>
						</View>
					))
				)}
			</View>
		</>
	);
};
const styles = StyleSheet.create({
	lightTxt: {
		color: color.medium,
		fontSize: 15,
		fontFamily: 'Lato_300Light',
	},
	todoItem: {
		backgroundColor: color.lighter,
		borderRadius: 5,
		overflow: 'hidden',
		marginVertical: 5,
		paddingLeft: 10,
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
	},
	btn: {
		backgroundColor: color.black,
		borderRadius: 0,
		marginLeft: 5,
	},
	innerBtn: {
		padding: 20,
	},
});
export default TasksList;
