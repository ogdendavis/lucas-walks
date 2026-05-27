import { CLIENT_ID, BACKEND_URL, FRONTEND_URL } from '../secrets.js';
import { getUser, setUser } from '../utils/utils.js';

// If we have a user in session storage, no need to log in
const user = getUser();
if (user) {
    // Redirect to the main page
    window.location.href = FRONTEND_URL;
}

// See if we have a login code in the URL
const urlParams = new URLSearchParams(window.location.search);
const loginCode = urlParams.get('code');

// If no login code, get one!
if (!loginCode) {
    const responseType = 'code';
    const redirectUri = `${FRONTEND_URL}/login`;
    const scope = 'read,activity:read';
    const clientId = CLIENT_ID;
    // Redirect the user to the Strava authorization page -- will come back here with a code when done
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
}
else {
    // If we have no user but we do have a login code, we need to exchange the code for an access token
    async function getTokenAndLogin() {
        const tokenResponse = await fetch(`${BACKEND_URL}/login?code=${loginCode}`, {
            method: 'GET'
        });
        const tokenData = await tokenResponse.json();
        console.log(tokenData);
        setUser(tokenData);
        window.location.href = FRONTEND_URL;
    }
    getTokenAndLogin();
}
