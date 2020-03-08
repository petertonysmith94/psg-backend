import express from 'express';
import { ChannelController, ProcessController, VideoController } from '../controllers';

/**
 * Instantiate any controllers for the application.
 * 
 * All controller classes require a routes method (used to register them to the router):
 *      routes = (router) => {
 *          router.get('/test', this.testMethod);
 *      }
 * 
 * They can also have a routePrefix:
 *      routePrefix = '/prefix'
 * 
 * The above example would resolve a GET route for the following address:
 *      Path:               "/prefix/test"
 *      Calling method:     this.testMethod
 */
const controllers = [
    new ChannelController(),
    new ProcessController(),
    new VideoController()
];

// Get the route prefix from the controller otherwise return default string.
const getPrefix = (controller) => {
    return controller.prefix != undefined && typeof(controller.prefix === 'string') ? controller.prefix : '';
}

// Adds all the routes to the application here
const generateRoutes = (app) => {
    var router = express.Router();

    controllers.forEach(controller => {
        if (controller.routes != undefined && typeof(controller.routes === 'function')) {
            const prefix = getPrefix(controller);
            const routes = controller.routes(router);
            app.use(prefix, routes);
        }
    });
};

export default generateRoutes;