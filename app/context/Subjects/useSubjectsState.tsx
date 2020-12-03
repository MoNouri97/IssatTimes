import { useEffect, useMemo, useReducer, useState } from 'react';
import faker from 'faker';
import { Subject } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InitialState } from '@react-navigation/native';
import {
	loadStateFromStorage,
	saveStateToStorage,
} from '../../utils/ManageAsyncStorage';

export type SubjectsState = {
	subjects: Subject[][] | null;
	loading: boolean;
};
export type ActionType = 'STOP_LOADING' | 'START_LOADING' | 'UPDATE' | 'RESET';

const hardCoded = () => {
	faker.seed(100);
	const temp: Subject[][] = [];
	for (let idx = 0; idx < 6; idx++) {
		const element = [];
		for (let j = 0; j < 5; j++) {
			element.push({
				name: faker.company.companyName(),
				teacher: faker.name.findName(),
				location: faker.address.county(),
				type: 'TD' as const,
				regime: 'H',
				time: ('s' + idx.toString()) as any,
			});
		}
		temp.push(element);
	}
	return temp;
};

export const initialState: SubjectsState = {
	subjects: null,
	loading: true,
};

const reducer = (
	state = initialState,
	{ type, payload }: { type: ActionType; payload?: Subject[][] },
): SubjectsState => {
	switch (type) {
		case 'START_LOADING':
			return { ...state, loading: true };
		case 'STOP_LOADING':
			return { ...state, loading: false };
		case 'UPDATE':
			return {
				subjects: payload ? payload : initialState.subjects,
				loading: false,
			};
		case 'RESET':
			return initialState;

		default:
			return state;
	}
};

export const useSubjectsState = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// useEffect(() => {
	// 	dispatch({ type: 'START_LOADING' });
	// 	loadStateFromStorage<Subject[][]>('subjects').then(data => {
	// 		if (!data) {
	// 			// dispatch({ type: 'STOP_LOADING' });
	// 			return;
	// 		}
	// 		dispatch({ type: 'UPDATE', payload: data });
	// 	});
	// }, []);

	useEffect(() => {
		if (!state.subjects) {
			return;
		}
		saveStateToStorage(state.subjects, 'subjects');
	}, [state.subjects]);
	const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
	return value;
};
