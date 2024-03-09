import moment from 'moment';
import sheets from './sheets.js';
import spreadsheetId from '../private/spreadsheetId.js';

const sheet = 'Sheet1';
const locale = 'pt-BR';
moment.locale(locale);

const getRange = async date => {
	const dateMoment = moment(date);
	const timeStr = dateMoment.format('HH:mm:ss');
	const yesterday = timeStr < '06:00:00';
	if (yesterday) {
		console.debug('yesterday');
		// consider end of shift started yesterday if before 6am
		dateMoment.add(-1, 'day');
	}
	const { data } = await sheets.spreadsheets.values.get({
		spreadsheetId,
		range: `${sheet}!A:Z`
	});

	const cols = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	const dateStr = dateMoment.format('YYYY-MM-DD');
	const todayIndex = (data.values || []).findIndex(row => {
		if (!row[0]) {
			return false;
		}
		const aux = new Date(row[0]);
		return aux.toISOString().startsWith(dateStr);
	});
	const today = todayIndex === -1 ? [] : data.values[todayIndex];
	const col = cols[today.length + 1];
	const row = dateMoment.get('date'); // todayIndex === -1 ? 1 : todayIndex + 1;
	const range = `${sheet}!${col}${row}`;
	return range;
};

const register = async () => {
	const date = new Date();

	console.debug('getting range');
	const range = await getRange(date);
	const firstOfDay = new RegExp(`^${sheet}!A`).test(range);

	const dateMoment = moment(date);
	const cellValue = `${dateMoment.format('YYYY-MM-DD HH:mm:ss')}`;
	const resource = {
		values: firstOfDay ? [[cellValue, cellValue]] : [[cellValue]]
	};

	console.debug('registering to the cell', range);
	const { data } = await sheets.spreadsheets.values.append({
		spreadsheetId: '1r_2TcewePjJsl1J_r6yJRMgbPk8ivgxcaxyaA3PsbVc',
		range,
		valueInputOption: 'USER_ENTERED',
		resource
	});

	return data;
};

export default async () => register();
