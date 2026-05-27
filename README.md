An app to display my walking routes (like CityStrides, which appears not to work any more)

Hand-coded because I use Claude too much for work already.
Write the back end in Python because that seems like useful knowledge to build

MVP:
 - Basic front end to display map
 - Basic back end to:
   1. fetch user routes and save the info
   2. provide info to front end to draw on the map

Once that's working:
 - Update front end to sign in with Strava, check for existing user, and then fetch existing data in db and/or new data in Strava to render map
 - Display different activities in different colors
 - ...?
