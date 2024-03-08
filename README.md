# Node.js Google Spreadsheet Access

This project is a Node.js application that accesses a Google Spreadsheet.

## Prerequisites

- Node.js installed on your machine
- Google account

## Setup

1. Clone this repository to your local machine.
2. Run `npm install` to install all necessary dependencies.

## Google Service Account Setup

To access Google Spreadsheet, you need to authenticate your application. Follow these steps to create a service account:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. In the sidebar, navigate to "APIs & Services" > "Credentials".
4. Click on "+ CREATE CREDENTIALS" and select "Service account".
5. Fill in the details for the service account (name, description, etc.).
6. Click "CREATE" and "CONTINUE" until you get to the "Grant this service account access to project" page.
7. From the "Role" dropdown, select "Project" > "Editor".
8. Click "CONTINUE" and then "DONE".
9. In the list of service accounts, find the one you just created and click on the email.
10. In the "Keys" section, click "ADD KEY" and select "JSON".
11. A JSON key file will be downloaded. Keep this file secure and do not share it publicly.

## Configuring the Application

1. Rename the downloaded JSON file to `google-auth.json` and move it to the private directory of this project.
2. In your Google Spreadsheet, click "Share" and share it with the email found in your `google-auth.json` file.

## Adding Google Sheets API to the Project

After setting up the service account, you need to enable the Google Sheets API for your project. Follow these steps:

1. In the Google Cloud Console, make sure you have selected the correct project for which you created the service account.
2. In the sidebar, navigate to "APIs & Services" > "Library".
3. In the search bar, type "Google Sheets API" and select it from the dropdown list.
4. Click "ENABLE".

Now, your application has access to the Google Sheets API using the service account.

## Running the Application

Run `node index.js` to start the application.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Node version: 20
