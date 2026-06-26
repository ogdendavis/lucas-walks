# Strava Data Downloader

This project provides Python scripts to authenticate with the Strava API and download your activity data.

## Prerequisites

- Python 3.8+
- A Strava account
- A Strava API Application (create one at [https://www.strava.com/settings/api](https://www.strava.com/settings/api))

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd strava-data
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in the root directory of the project.
    Add your Strava API Client ID and Client Secret:

    ```env
    STRAVA_CLIENT_ID=your_client_id_here
    STRAVA_CLIENT_SECRET=your_client_secret_here
    ```

## Usage

### 1. Authenticate

Run the authentication script to generate your OAuth tokens. This is a one-time process (or until your refresh token expires/is revoked).

```bash
python strava/authenticate.py
```

- Follow the instructions printed in the console.
- Visit the provided URL in your browser.
- Authorize the application.
- You will be redirected to a localhost URL (e.g., `http://localhost:8000/authorized?state=&code=...`).
- Copy the `code` parameter value from the URL.
- Paste the code back into the terminal prompt.

Upon successful authentication, your tokens will be saved to `strava/strava_tokens.json`.

### 2. Download Activities

Run the activity downloader script to fetch your Strava activities.

```bash
python strava/download_activities.py
```

- This script will download your activities and save them to `data/activities.json`.
- It handles pagination and rate limiting automatically.
- It also manages token refreshing if your access token has expired.
- Subsequent runs will check for new activities since the last recorded one.

## Project Structure

-   `strava/authenticate.py`: Script to handle the initial OAuth flow.
-   `strava/download_activities.py`: Script to download and update activity data.
-   `data/activities.json`: The storage file for your downloaded activities.
-   `.env`: Configuration file for API credentials (not committed to version control).
