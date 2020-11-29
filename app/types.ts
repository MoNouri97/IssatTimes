export interface Subject {
	name: string;
	teacher: string;
	location: string;
	type: 'C' | 'TD' | 'TP';
	regime: string;
	time: 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's4-1';
}
