const Sequelize = require('sequelize');

require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: Sequelize.Op,
  define: {
    underscored: true,
    underscoredAll: true,
  },
};
