import { useMemo, useState } from 'react';
import faker from 'faker';
import { Subject } from '../types';

export const initState = () => {
	const res = [];
	for (let index = 0; index < 6; index++) {
		res.push([]);
	}
	return res;
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

export const useSubjectsState = () => {
	const [subjects, setSubjects] = useState<Subject[][]>(initState);
	const value = useMemo(() => ({ subjects, setSubjects }), [
		subjects,
		setSubjects,
	]);
	return value;
};
