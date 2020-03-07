import express from 'express';
import generateRoutes from './routes';
import database from './database';

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// Initialise express application
const app = express();

database.sequelize.sync().then(() => {
  // Register the routes
  generateRoutes(app);

  // Start service
  app.listen(PORT, HOST);
  console.log(`Running on http://${ HOST }:${ PORT }/`);
});