import { startShift, endShift } from './src/registerShift.js';
import register from './src/register.js';

const startStrs = ['start', 'iniciar', 'entrada', 'começar', 'comecar'];
const endStrs = ['end', 'terminar', 'sair', 'fim', 'finalizar'];

const start = startStrs.reduce((acc, str) => acc || process.argv.includes(str), false);
const end = endStrs.reduce((acc, str) => acc || process.argv.includes(str), false);
const registerTime = process.argv.includes('register');

if (start) {
	startShift();
}
if (end) {
	endShift();
}
if (registerTime) {
	register();
}

if (!(start || end || registerTime)) {
	console.error('Nenhuma ação foi especificada. Utilize um dos seguintes comandos:');
	console.error('start, iniciar, entrada, começar, comecar, end, terminar, sair, fim, finalizar');
}
