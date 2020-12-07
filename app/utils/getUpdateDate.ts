import cheerioRN from 'react-native-cheerio';
// import cheerioRN from 'cheerio';

export const getUpdateDate = (html: string) => {
	const $ = cheerioRN.load(html);

	// this line caused me to loose my sanity
	// const date = $('h5.heading-title') : causes a crash but not this :/
	const dateString = $('h5.heading-title').text();

	// [day,month,year]
	const dateArr = dateString.split(': ')[1].split('-');

	// needs to be year,month(jan is 0) , day
	const date = new Date(
		parseInt(dateArr[2]),
		parseInt(dateArr[1]) - 1,
		parseInt(dateArr[0]),
	);
	return date;
};
