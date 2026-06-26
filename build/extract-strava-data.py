# Script to extract Strava data for the front-end from full strava API response, and minimize the resulting JSON

'''
Frontend uses activity.[list below]:
- distance
- map
- sport_type
- start_date
- type
- utc_offset 
'''

import os
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Variable to hold the minimized activities
little_activities = []

# Get the full activities list from the JSON file and save only the required fields to our new list
with open('../strava-data/data/activities.json', 'r') as f:
    big_activities = json.load(f)
    for activity in big_activities:
        little_activities.append({
            'distance': activity.get('distance'),
            'map': activity.get('map'),
            'sport_type': activity.get('sport_type'),
            'start_date': activity.get('start_date'),
            'type': activity.get('type'),
            'utc_offset': activity.get('utc_offset')
        })

# Save the minimized activities to a new JSON file in the front end folder, overwriting if it already exists
with open('../frontend/data/activities.json', 'w') as f:
    json.dump(little_activities, f)

logging.info(f"Saved {len(little_activities)} minimized activities to ../frontend/data/activities.json")