import request from './request';

export default async function readLogs() {
	const logs = await request('http://43.200.129.25:3000/api/logs', {
		method: 'GET',
	});

	return logs;
}
