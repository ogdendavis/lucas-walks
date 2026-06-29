An app to display my walking/running/biking routes from Strava (like CityStrides, which appears not to work any more)

Hand-coded because I use Claude too much for work already.
Write the back end in Python because that seems like useful knowledge to build

MVP:
 - Basic front end to display map
 - Basic back end to:
   1. fetch user routes and save the info
   2. build a static front-end to display the map

## Running the data pipeline!

The old backend (API server) has been replaced with a python pipeline that just downloads my activities and provides them for the frontend. It's lightly modified from [strava-data](https://github.com/martinjc/strava-data)

To run it:

1. Go to the strava-data folder and set up the virtual environment:
    ```bash
    $ cd strava-data
    $ source venv/bin/activate # If working in vscode, this might have been done automatically
    ```
2. Get a strava token to use for fetching activities -- this generates a login link, and after logging in you have to paste the generated code back into the script, which then saves the token locally:
    ```bash
    $ python strava/authenticate.py
    ```
3. Run the activity fetcher -- it only loads activities after those already found in `data/activities.json`, so if you want a full refresh, delete that file first
    ```bash
    $ python strava/download_activities.py
    ```
4. Run build script to create a smaller json file for the frontend:
    ```bash
    $ cd ../build # if you're coming from the strava-data folder
    $ python extract-strava-data.py
    ```
5. Run/build the frontend locally:
    ```bash
    $ cd ../frontend # if you're coming from the build folder
    $ npx parcel index.html
    <Go to http://localhost:1234/ in the browser to make sure it looks good>
    ```
