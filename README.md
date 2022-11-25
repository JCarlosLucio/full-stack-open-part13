# Full Stack Open - Part 13 - [Using relational databases](https://fullstackopen.com/en/part13)

Solutions for part 13 exercises

#

## Installation 🪛

Clone repo and run `npm install` inside the project folder.  
Create `.env` file.  
Add `DATABASE_URL`, `SECRET` and `PORT` to your .env file.

## Available Scripts 📜

### `npm start`

Runs the server.  
Be sure to first tunnel db connection, as stated below.

### `npm dev`

Runs the server in development mode.  
Be sure to first tunnel db connection, as stated below.

### `migration:down`

Issues a rollback to the database.

## Postgres Database from [Fly.io](https://fly.io/) 🚀

[Migrated from Heroku](https://fly.io/docs/postgres/getting-started/migrate-from-heroku/)

Connect to your database instance to run queries (ex. \dt).

```sh
fly pg connect -a <postgres-app-name> -d <db-name>
```

The
[local connection](https://fly.io/docs/postgres/connecting/connecting-with-flyctl/)
to the database should first be enabled by tunneling the localhost port 5432.
The command must be left running while the database is used. So do not close the
console!

```sh
flyctl proxy 5432 -a <postgres-app-name>
```

The Fly.io connect-string is of the form:

`DATABASE_URL=postgres://postgres:<password>@localhost:5432/<db-name>`
