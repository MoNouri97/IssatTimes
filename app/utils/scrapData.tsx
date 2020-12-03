import { WebViewMessageEvent } from 'react-native-webview';
import cheerioRN from 'react-native-cheerio';
import { Subject } from '../types';

export const scrapData = (event: WebViewMessageEvent) => {
	const $ = cheerioRN.load(event.nativeEvent.data);

	// needed vars
	const week: Subject[][] = [];
	let dayArray: Subject[] = [];
	let dayNbr = -1;

	try {
		// extracting columns
		const days = $('.table-striped td:nth-child(1)');
		const times = $('.table-striped td:nth-child(2)');
		const subjects = $('.table-striped td:nth-child(5)');
		const teachers = $('.table-striped td:nth-child(6)');
		const types = $('.table-striped td:nth-child(7)');
		const locations = $('.table-striped td:nth-child(8)');
		const regimes = $('.table-striped td:nth-child(9)');

		days.each((i: any, d: any) => {
			const day = $(d).text() as string;

			if (day.length === 0) {
				// add subjects
				const name = ($(subjects.get(i)).text() as string).split('-')[1];

				if (name == undefined) {
					// empty row
					return;
				}

				const time = $(times.get(i)).text();
				const teacher = $(teachers.get(i)).text();
				const location = $(locations.get(i)).text();
				const type = $(types.get(i)).text();
				const regime = $(regimes.get(i)).text();
				const subject: Subject = {
					name,
					teacher,
					location,
					type,
					regime,
					time,
				};
				dayArray.push(subject);
			} else {
				if (!day.includes('di')) {
					return;
				}
				if (dayArray.length > 0) {
					week.push(dayArray);
					dayArray = [];
				}
				dayNbr += 1;
			}
		});
		// the last day needs to be added
		week.push(dayArray);
	} catch (error) {
		console.log(error.message);
	}
	return week;
};
