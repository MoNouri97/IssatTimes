import React from 'react';
import { Subject } from '../../types';
import { ActionType, SubjectsState, initialState } from './useSubjectsState';

export const SubjectsContext = React.createContext<{
	state: SubjectsState;
	dispatch:
		| undefined
		| React.Dispatch<{
				type: ActionType;
				payload?: Subject[][];
		  }>;
}>({ state: initialState, dispatch: undefined });
