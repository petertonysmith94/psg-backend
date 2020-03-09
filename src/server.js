import express from 'express';
import bodyParser from 'body-parser';
import generateRoutes from './routes';
import database from './database';

// Constants
const PORT = process.env.PORT || 80;
const HOST = process.env.HOSTNAME || '0.0.0.0';

// Initialises the express application
const app = express();
app.use(bodyParser.json());

database.sequelize.sync().then(() => {
  // Register the routes
  generateRoutes(app);

  // Start service
  app.listen(PORT, HOST);
  console.log(`Running on http://${ HOST }:${ PORT }/`);
});