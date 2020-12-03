import { useEffect, useMemo, useReducer, useState } from 'react';
import faker from 'faker';
import { Subject } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InitialState } from '@react-navigation/native';

export type SubjectsState = {
	subjects: Subject[][];
	loading: boolean;
};
export type ActionType = 'START_LOADING' | 'UPDATE' | 'RESET';

const loadStateFromStorage = async () => {
	const saved = await AsyncStorage.getItem('subjects');
	console.log({ saved });

	return saved ? (JSON.parse(saved) as Subject[][]) : null;
};
const saveStateToStorage = async (data: Subject[][]) => {
	await AsyncStorage.setItem('subjects', JSON.stringify(data));
};

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
	subjects: [[], [], [], [], [], []],
	loading: true,
};

const reducer = (
	state = initialState,
	{ type, payload }: { type: ActionType; payload?: Subject[][] },
): SubjectsState => {
	switch (type) {
		case 'START_LOADING':
			return { ...state, loading: true };
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
	// 	saveStateToStorage(state.subjects);
	// }, [state.subjects]);

	// useEffect(() => {
	// 	dispatch({ type: 'START_LOADING' });
	// 	loadStateFromStorage().then(data => {
	// 		if (!data) {
	// 			dispatch({ type: 'RESET' });
	// 			return;
	// 		}
	// 		dispatch({ type: 'UPDATE', payload: data });
	// 	});
	// }, []);

	const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
	return value;
};
