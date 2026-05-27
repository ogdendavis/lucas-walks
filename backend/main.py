from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import requests

import secrets

app = FastAPI()

# Enable CORS
origins = [
    "http://localhost:8080",
    "https://localhost:8080"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# After Strava signin, use the provided code to get an access token to make API calls for the user
@app.get('/login')
def strava_auth(code: str = None):
    if (code is None):
        return null
    
    try:
        # Use the login code to get the access and refresh tokens (and user info)
        response = requests.post(
            "https://www.strava.com/oauth/token",
            data={
                "client_id": secrets.CLIENT_ID,
                "client_secret": secrets.CLIENT_SECRET,
                "code": code,
                "grant_type": "authorization_code"
            }
        ).json()

        return response
    except Exception as e:
        print("Exception when calling OAuthApi->exchange_token: %s\n" % e)

# Main map page
@app.get('/activities')
def get_all_strava_activities(access_token: str = None):
    try:
        # Create a list to store activities
        activities = []

        # Paginate until we have all activities
        page = 1
        page_size = 200
        while True:
            response = requests.get(
                "https://www.strava.com/api/v3/athlete/activities",
                headers={"Authorization": f"Bearer {access_token}"},
                params={"page": page, "per_page": page_size}
            ).json()

            if not response or len(response) == 0:
                break

            activities.extend(response)
            page += 1

        return activities
    except Exception as e:
        print("Exception when calling ActivitiesApi->get_logged_in_athlete_activities: %s\n" % e)
