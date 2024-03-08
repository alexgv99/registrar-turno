import { readFileSync } from 'fs';
import { google } from 'googleapis';
// waiting for assert/with aproval on ecmascript to avoid eslint error
// import credentials from '../private/google-auth.json' assert { type: 'json' };
// import credentials from '../private/google-auth.json' with { type: 'json' };

const file = readFileSync('./private/google-auth.json', 'utf8');
const credentials = JSON.parse(file);
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const auth = new google.auth.GoogleAuth({ credentials, scopes });
const sheets = google.sheets({ version: 'v4', auth });

export default sheets;
