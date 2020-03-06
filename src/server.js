import express from 'express';
import Routes from './routes';

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// Initialise application and it's routes
const app = express();
Routes(app);

// Start service
app.listen(PORT, HOST);
console.log(`Running on http://${ HOST }:${ PORT }/`);