const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
  'votingapp',
  'postgres',
  process.env.PG_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  },
);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Database connected ...!');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
