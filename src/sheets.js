import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
	keyFilename: '../private/google-auth.json',
	scopes: 'https://www.googleapis.com/auth/spreadsheets'
});

const sheets = google.sheets({ version: 'v4', auth });

export default sheets;
