# City game app
This app is a custom frontend for toto.io

## instalation
run `npm i`

copy the `.env.example` to `.env` and fill it in.

## run

run `npm run start`


## deploy
make sure the `.env` is filled in.
run  `docker build -t citygame .`
run `docker run -p 80:80 citygame`
