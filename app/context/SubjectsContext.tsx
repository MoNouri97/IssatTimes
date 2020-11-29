import React from 'react';
import { Subject } from '../types';

export const SubjectsContext = React.createContext<{
	subjects: Subject[][];
	setSubjects: React.Dispatch<React.SetStateAction<Subject[][]>> | undefined;
}>({ subjects: [], setSubjects: undefined });
