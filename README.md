# sequelize-troubleshooting
Minimal reproduction of a problem with Sequelize

See [the stackoverflow question](https://stackoverflow.com/questions/47064573/why-does-sequelize-think-my-models-are-not-associated/47078209) for more information the specific problem reproduced in this repo.

## Get started

- Install Postgres
- Launch Postgres
- Create a database called `troubleshooting` (or any other name, but don't forget to use that same name in [the config](sequelize/config.js))
- You might also need to change `username` and `password` for the database in [the config](sequelize/config.js)
- clone this repo
- `npm install`
- `npm start`

That last step will first run the migrations, and then attempt to perform the query I am having troubles with. If the query successfully returns with a list of 0 rows, then my problem is solved. That is the challenge. I've tried **a lot** of different things, but I can't get the query to behave as expected..
