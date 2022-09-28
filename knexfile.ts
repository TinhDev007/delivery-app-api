import * as dotenv from "dotenv";
import type { Knex } from "knex";

dotenv.config({ path: __dirname + '/.env.database' });

// dotenv.config({ path: __dirname + '/.env.database' });
// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.UNAME,
      password: process.env.PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: 'dbMigrations'
    }
  },

  staging: {
    client: "pg",
    connection: {
      host: process.env.HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.UNAME,
      password: process.env.PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: 'dbMigrations'
    }
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.UNAME,
      password: process.env.PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: 'dbMigrations'
    }
  }

};

