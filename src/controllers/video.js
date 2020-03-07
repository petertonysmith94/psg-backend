import database from '../database';

class VideoController {
  prefix = '/videos';

  // Register the routes in the router
  routes = (router) => {
    router.get('', this.index);
    router.post('', this.store);
    router.get('/:video', this.show);
    router.delete(':video', this.delete);

    return router;
  }

  index = (req, res) => {
    // Store a video
    database.models.video
      .findAll()
      .then(result => res.json(result));
  }

  store = (req, res) => {
    // Store a video
    database.models.video
      .findAll()
      .then(result => res.json(result));
  }

  show = (req, res) => {
    // Store a video
    database.models.video
      .findAll()
      .then(result => res.json(result));
  }

  delete = (req, res) => {
    // Store a video
    database.models.video
      .findAll()
      .then(result => res.json(result));
  }
}

export default VideoController;