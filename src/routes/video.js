/**
 * Display all the videos
 * 
 * @param {*} request 
 * @param {*} response 
 */
const index = (request, response) => {
    response.send('Index');
}

const store = (request, response) => {
    response.send('Store');
}

/**
 * Wrapper around the routes
 * @param {*} app 
 */
const Routes = (app) => {
  app.route('/video')
      .get(index);
}

export default Routes;