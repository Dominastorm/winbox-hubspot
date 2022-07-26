require('dotenv').config();
const express = require('express');
const app = express();

const PORT = 3000;

// fetching the client ID and secret from the .env file
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Scopes acn be passed here or written in the .env file
let SCOPES = ['crm.objects.contacts.read crm.objects.contacts.write'];
if (process.env.SCOPES) {
    const SCOPES = (process.env.SCOPES.split(/ |, ?|%20/)).join(' ');
}

// on successful install, users will be redirected to /oauth-callback
const REDIRECT_URI = `http://localhost:${PORT}/oauth-callback`;

//================================//
//   Running the OAuth 2.0 Flow   //
//================================//

// Step 1
// Build the authorization URL to redirect a user
// to when they choose to install the app
const authUrl =
'https://app.hubspot.com/oauth/authorize' +
`?client_id=${encodeURIComponent(CLIENT_ID)}` +
`&scope=${encodeURIComponent(SCOPES)}` +
`&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

// Redirect the user from the installation page to
// the authorization URL
app.get('/install', (req, res) => {
    console.log('');
    console.log('=== Initiating OAuth 2.0 flow with HubSpot ===');
    console.log('');
    console.log("===> Step 1: Redirecting user to your app's OAuth URL");
    res.redirect(authUrl);
    console.log('===> Step 2: User is being prompted for consent by HubSpot');
  });

app.listen(PORT)
console.log(`Listening on port ${PORT}`);
