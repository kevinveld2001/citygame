# ACuTe Nova Gorica - "City and city" game app
This app is a custom frontend for [toto.io](https://toto.io/). It houses a user interface, Toto games and custom games for the [ACuTe project for Gorizia and Nova Gorica](https://www.europeantheatre.eu/page/activities/acute) (European Capital of Culture 2025).

## Installation
- Install packages: run `npm i`.
- Copy the `.env.example` to `.env` and fill it in.
  - REACT_APP_MAPBOX_KEY: Mapbox access token for instances of "mapboxgl".
  - REACT_APP_EXPERIMENTAL_FEATURES: Exposes a page for development features in Settings.
  - REACT_APP_INIT_SESSIONS: Voucher IDs from Toto for sessions ("quests") to init by default on any new user account (including try accounts). Comma-separated without spaces. Can be empty.
  - REACT_APP_REPO_ID: Toto repository ID for the app.

## Run

Run `npm run start` in development.


## Deploy via Docker
- Make sure the `.env` is filled in.
- Run  `docker build -t citygame .`
- Run `docker run -p 80:80 citygame`

## Known issues
Check the GitHub Issues. Internally, a "Technical Notes" document should be reviewed for even more issues and details.