export interface Subject {
	name: string;
	teacher: string;
	location: string;
	type: 'C' | 'TD' | 'TP';
	regime: string;
	time: 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | "S4'";
}
export type groupInfo = {
	id: string;
	name: string;
	subGroup: 1 | 2;
};
export type ParamList = {
	weekDay: { index: number };
	Main: undefined;
	'Choose Group': {};
	Settings: undefined;
};

export type loadingStates =
	| 'Loading Site ...'
	| 'Choosing Group ...'
	| 'Collecting Data ...'
	| 'Done';
