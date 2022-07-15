export default async function request(url, option) {
	try {
		const response = await fetch(url, option);

		if (!response.ok) {
			throw new Error('Error is Occured!');
		}

		return await response.json();
	} catch (e) {
		console.error(e);
	}
}
