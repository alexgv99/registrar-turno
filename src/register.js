import sheets from './sheets.js';
import spreadsheetId from '../private/spreadsheetId.js';

const sheet = 'Sheet2';

const getRange = async dateStr => {
	console.debug('buscando última data');
	const rangeSearch = `${sheet}!A:Z`;
	const { data } = await sheets.spreadsheets.values.get({
		spreadsheetId,
		range: rangeSearch
	});

	const cols = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	const todayIndex = (data.values || []).findIndex(row => row[0] === dateStr);
	const col = cols[(data.values?.[todayIndex]?.length || 0) + 1];
	const row = todayIndex === -1 ? 1 : todayIndex + 1;
	const rangeOutput = `${sheet}!${col}${row}`;
	return rangeOutput;
};

const register = async () => {
	const date = new Date();
	const dateString = date.toLocaleDateString('pt-BR');
	const timeString = date.toLocaleTimeString('pt-BR');

	const range = await getRange(dateString);
	const firstOfDay = range === `${sheet}!A1`;

	const resource = {
		values: firstOfDay ? [[dateString, timeString]] : [[timeString]]
	};
	const { data } = await sheets.spreadsheets.values.append({
		spreadsheetId: '1r_2TcewePjJsl1J_r6yJRMgbPk8ivgxcaxyaA3PsbVc',
		range,
		valueInputOption: 'USER_ENTERED',
		resource
	});

	return data;
};

export default async () => register();
