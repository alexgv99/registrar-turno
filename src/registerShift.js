import sheets from './sheets.js';
import spreadsheetId from '../private/spreadsheetId.js';

const sheet = 'Sheet1';

const lastRow = async range => {
	console.debug('buscando última linha na range: ', range);
	const { data } = await sheets.spreadsheets.values.get({
		spreadsheetId,
		range
	});

	return data.values?.length || 0;
};

const registerShift = async (action, range) => {
	console.debug('registrando', action, 'na célula', range);

	const date = new Date();
	const dateString = date.toLocaleDateString('pt-BR');
	const timeString = date.toLocaleTimeString('pt-BR');

	const { data } = await sheets.spreadsheets.values.append({
		spreadsheetId: '1r_2TcewePjJsl1J_r6yJRMgbPk8ivgxcaxyaA3PsbVc',
		range,
		valueInputOption: 'USER_ENTERED',
		resource: {
			values: [[dateString, timeString, date]]
		}
	});

	return data;
};

export const startShift = async () => {
	const range = await lastRow(`${sheet}!A:A`);
	return registerShift('Entrada', `${sheet}!A${range + 1}`);
};

export const endShift = async () => {
	const range = await lastRow(`${sheet}!D:D`);
	return registerShift('Saída', `${sheet}!D${range + 1}`);
};
