import request from './request';

export default async function readLogs() {
	console.log('going');
	const logs = await request('http://43.200.129.25:3000/api/logs', {
		method: 'GET',
	});

	console.log(logs);

	return logs;
}
