import { useEffect, useMemo, useReducer } from 'react';
import faker from 'faker';
import { Subject } from '../../types';
import { saveStateToStorage } from '../../utils/ManageAsyncStorage';
import { keys } from '../../config/vars';

export type SubjectsState = {
	// [mon,tue,wed,thur,fri,sat,
	// & another 5 days for 2nd group specific subjects]
	subjects: Subject[][] | null;
	loading: boolean;
};
export type ActionType = 'STOP_LOADING' | 'START_LOADING' | 'UPDATE' | 'RESET';

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

	useEffect(() => {
		if (!state.subjects) {
			return;
		}
		saveStateToStorage(state.subjects, keys.SUBJECTS);
	}, [state.subjects]);
	const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
	return value;
};
