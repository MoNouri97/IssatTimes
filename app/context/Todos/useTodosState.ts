import { useEffect, useMemo, useReducer } from 'react';
import faker from 'faker';
import { Subject, Todo } from '../../types';
import { saveStateToStorage } from '../../utils/ManageAsyncStorage';
import { keys } from '../../config/vars';

export type TodosState = {
	todos: Todo[];
	loading: boolean;
};
export type ActionType = 'ADD' | 'COMPLETE' | 'DELETE';
export type PayloadType = { todo?: Todo; index?: number };

export const initialState: TodosState = {
	todos: [],
	loading: true,
};

const reducer = (
	state = initialState,
	{ type, payload }: { type: ActionType; payload?: PayloadType },
): TodosState => {
	switch (type) {
		case 'ADD':
			return { ...state, todos: [...state.todos, payload?.todo!] };
		case 'COMPLETE':
			return {
				...state,
				todos: state.todos.map((todo, idx) =>
					idx !== payload?.index ? todo : { ...todo, done: true },
				),
			};
		case 'DELETE':
			return {
				...state,
				todos: state.todos.filter((_, idx) => idx !== payload?.index),
			};
		default:
			return state;
	}
};

export const useTodosState = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (!state.todos) {
			return;
		}
		saveStateToStorage(state.todos, keys.TODOS);
	}, [state.todos]);
	const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
	return value;
};
