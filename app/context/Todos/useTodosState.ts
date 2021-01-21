import { useEffect, useMemo, useReducer } from 'react';
import faker from 'faker';
import { Subject, Todo } from '../../types';
import {
	loadStateFromStorage,
	saveStateToStorage,
} from '../../utils/ManageAsyncStorage';
import { keys } from '../../config/vars';

export type TodosState = {
	todos: Todo[];
	loading: boolean;
};
export type ActionType = 'ADD' | 'COMPLETE' | 'DELETE' | 'LOAD';
export type PayloadType = { all?: Todo[]; todo?: Todo; id?: string };

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
		case 'LOAD':
			return { ...state, todos: [...state.todos, ...payload?.all!] };
		case 'COMPLETE':
			return {
				...state,
				todos: state.todos.map(todo =>
					todo.id !== payload?.id ? todo : { ...todo, done: true },
				),
			};
		case 'DELETE':
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== payload?.id),
			};
		default:
			return state;
	}
};

export const useTodosState = () => {
	const [state, dispatch] = useReducer(reducer, initialState, () => {
		loadStateFromStorage<Todo[]>(keys.TODOS).then(data => {
			dispatch({ type: 'LOAD', payload: { all: data ? data : [] } });
		});
		return { ...initialState };
	});

	useEffect(() => {
		if (!state.todos) {
			return;
		}
		saveStateToStorage(state.todos, keys.TODOS);
	}, [state.todos]);
	const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
	return value;
};
