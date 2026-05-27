import { getUser, getUserActivities } from '../utils/utils.js';

// See if we're logged in
let user = getUser();
if (!user) {
    // If not, redirect to the login page
    window.location.href = 'login.html';
}

// Relies on leaflet.js script in the HTML file
const map = L.map('map').setView([40.685, -73.977], 1);

// Add OpenStreetMap tiles to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    referrerPolicy: 'strict-origin'
}).addTo(map);

// Get the user's current location and set the map view to that location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        map.setView([userLat, userLng], 13);
    }, function() {
        console.error("Error getting user's location.");
    });
}

// get the user's activities from session storage or the backend and add them to the map
async function loadActivities() {
    // Get the user's activities from session storage or the backend
    const activities = await getUserActivities();
    // Loop through the activities and add them to the map
    activities.forEach(activity => {
        if (activity?.map?.summary_polyline) {
            // Extract info from the activity object (use offset to get local date of the activity)
            const activityDate = new Date(new Date(activity.start_date).getTime() + (activity.utc_offset * 1000)).toISOString().split('T')[0];
            const activityType = activity.sport_type || activity.type;
            const activityDistance = (activity.distance / 1000).toFixed(2);
            // Add the activity polyline to the map with a popup showing the info
            L.Polyline.fromEncoded(
                activity.map.summary_polyline,
                {color: '#1177cc', weight: 3, opacity: 0.7}
            ).bindPopup(`<b>${activityType}</b><br>${activityDate}<br>${activityDistance} km`)
            .addTo(map);
        }
    });
}
loadActivities();
