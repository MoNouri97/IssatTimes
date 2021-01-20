import React from 'react';
import { View } from 'react-native';
import {
	ActionType,
	TodosState,
	initialState,
	PayloadType,
	useTodosState,
} from './useTodosState';

export const TodosContext = React.createContext<{
	state: TodosState;
	dispatch:
		| undefined
		| React.Dispatch<{
				type: ActionType;
				payload?: PayloadType;
		  }>;
}>({ state: initialState, dispatch: undefined });

export const TodosProvider: React.FC = ({ children }) => {
	const todosValue = useTodosState();

	return (
		<TodosContext.Provider value={todosValue}>{children}</TodosContext.Provider>
	);
};

export default TodosContext;
