import { Sequelize, Op } from 'sequelize';
import generateModels from './models';

// Define variables
const database = process.env.DATABASE_NAME || 'mydb';
const username = process.env.DATABASE_USERNAME || 'psg';
const password = process.env.DATABASE_PASSWORD || 'secret';
const host = process.env.DATABASE_HOST || 'database';
const dialect  = 'mysql';

// Set up the sequelize package
const sequelize = new Sequelize({
  host,
  database,
  username,
  password,
  dialect,
  logging: console.log,
  alter: true,             // TODO: remove for production, implement migrations
  operatorsAliases: {
    $like: Op.like,
    $not: Op.not,
    $or: Op.or
  }
});

// Import all our models
const models = generateModels(sequelize);

// Define the database object
const db = {
  sequelize,
  models
};

export default db;