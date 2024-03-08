import sheets from './sheets.js';
import spreadsheetId from '../private/spreadsheetId.js';

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
	const { data } = await sheets.spreadsheets.values.append({
		spreadsheetId: '1r_2TcewePjJsl1J_r6yJRMgbPk8ivgxcaxyaA3PsbVc',
		range,
		valueInputOption: 'USER_ENTERED',
		resource: {
			values: [[action, new Date().toLocaleString('pt-BR')]]
		}
	});

	return data;
};

const startShift = async () => {
	const range = await lastRow('A:A');
	return registerShift('Entrada', `A${range + 1}`);
};

const endShift = async () => {
	const range = await lastRow('C:C');
	return registerShift('Saída', `C${range + 1}`);
};

(async () => {
	console.debug(await startShift());
	console.debug(await endShift());
})();
