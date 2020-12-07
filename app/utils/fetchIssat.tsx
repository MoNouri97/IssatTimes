export const fetchIssat = (body?: any, cookie: string = '') => {
	const method = body ? 'POST' : 'GET';
	console.log({ method, body, cookie });

	return fetch('http://www.issatso.rnu.tn/fo/emplois/emploi_groupe.php', {
		method,
		headers: {
			Cookie: JSON.stringify(cookie),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		credentials: 'omit',
		body: JSON.stringify(body),
	});
};

export const fetchHtml = async (url: string) => {
	const data = await fetch(url, {
		method: 'GET',
	});

	return data.text();
};
