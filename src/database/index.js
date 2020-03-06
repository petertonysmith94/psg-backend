import { Sequelize } from 'sequelize';
import generateModels from './models';

// Define variables
const database = process.env.DATABASE_NAME || 'mydb';
const username = process.env.DATABASE_USERNAME || 'psg';
const password = process.env.DATABASE_PASSWORD || 'secret';
const hostname = process.env.DATABASE_HOST || 'psg-database';
const dialect  = 'mysql';

// Set up the sequelize package
const sequelize = new Sequelize(database, username, password, {
  hostname,
  dialect,
  logging: console.log
});

// Import all our models
const models = generateModels(sequelize);

// Define the database object
const db = {
  sequelize,
  models
};

export default db;