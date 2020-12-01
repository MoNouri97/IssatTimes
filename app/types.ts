export interface Subject {
	name: string;
	teacher: string;
	location: string;
	type: 'C' | 'TD' | 'TP';
	regime: string;
	time: 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's4-1';
}
export type groupInfo = {
	id: string;
	name: string;
};
export type ParamList = {
	weekDay: { index: number };
	Main: undefined;
	'Choose Group': {};
};

export type loadingStates =
	| 'Not Loading'
	| 'Loading www.issatso.rnu.tn ...'
	| 'Choosing Group ...'
	| 'Collecting Data ...'
	| 'Done';
