const { Sequelize } = require("sequelize");
const path = require("path");
const pg = require("pg");

let sequelize;

if (process.env.DATABASE_URL) {
  // Production: Supabase PostgreSQL
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",

    // Penting untuk Vercel
    dialectModule: pg,

    logging: false,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

    pool: {
      max: 1,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
  });
} else {
  // Development lokal: SQLite
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "database.sqlite"),
    logging: false,
  });
}

module.exports = sequelize;
