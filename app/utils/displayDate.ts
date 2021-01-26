export const displayDate = (date: Date | undefined) => {
	if (!date) return '';
	const dd = date.getDate();
	const mm = date.getMonth() + 1;
	const yyyy = date.getFullYear();

	const strings = [
		mm < 10 ? '0' + mm : mm + '',
		dd < 10 ? '0' + dd : dd + '',
		yyyy,
	];

	return `${strings[0]}/${strings[1]}/${strings[2]}`;
	// date = mm + '-' + dd + '-' + yyyy;
	// console.log(date);
	// date = mm + '/' + dd + '/' + yyyy;
	// console.log(date);
	// date = dd + '-' + mm + '-' + yyyy;
	// console.log(date);
	// date = dd + '/' + mm + '/' + yyyy;
	// console.log(date);
};
