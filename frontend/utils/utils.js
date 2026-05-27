import { BACKEND_URL } from '../secrets.js';

export function getUser() {
    const user = sessionStorage.getItem('mapUser');
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}

export function setUser(user) {
    sessionStorage.setItem('mapUser', JSON.stringify(user));
}

export async function getUserActivities() {
    const activities = sessionStorage.getItem('mapUserActivities');
    if (activities) {
        return JSON.parse(activities);
    } else {
        const token = getUser()?.access_token;
        const response = await fetch(`${BACKEND_URL}/activities?access_token=${token}`, {
            method: 'GET'
        });
        const activities = await response.json();
        sessionStorage.setItem('mapUserActivities', JSON.stringify(activities));
        return activities;
    }
}
