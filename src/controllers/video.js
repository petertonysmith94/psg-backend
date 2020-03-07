import database from '../database';
import { get } from 'lodash';

class VideoController {
  prefix = '/videos';

  /**
   * Register the routes in the router
   * 
   * @param Router  express router instance
   */
  routes = (router) => {
    router.get('', this.index);
    router.post('', this.store);
    router.get('/:video', this.show);
    router.delete('/:video', this.delete);

    return router;
  }

  /**
   * Shows all the videos
   * 
   * @returns 200   Success
   * @returns 500   An error occured
   */
  index = (req, res) => {
    // Find all the videos in the database
    database.models.video
      .findAll()
      .then(result => res.status(200).json(result))
      .catch(error => res.status(500).json(error));
  }

  /**
   * Stores a video resource
   * TODO: ADD VALIDATION
   * 
   * @returns 200   Successfully stored resource
   * @returns 500   An error occured
   */
  store = (req, res) => {
    // Store a video into the database
    database.models.video
      .create({
        title: get(req, 'body.title', null),
        date: get(req, 'body.date', null)
      })
      .then(result => res.status(200).json(result))
      .catch(error => res.status(500).json(error));
  }

  /**
   * Show a video resource
   * 
   * @returns 200   Successfully found resource
   * @returns 404   Resource not found
   * @returns 500   An error occured
   */
  show = (req, res) => {
    // Find a video with the ID supplied
    database.models.video
      .findByPk(
        get(req, 'params.video', 0)
      )
      .then(result => {
        // Resource can't be found.
        if (null === result) {
          res.status(404).json();
        }

        // Successfully found the resource.
        res.status(200).json(result);
      })
      .catch(error => res.status(500).json(error));
  }

  /**
   * Delete a video resource
   * 
   * @returns 200   Successfully deleted resource
   * @returns 404   Resource not found
   * @returns 500   An error occured
   */
  delete = (req, res) => {
    // Store a video
    database.models.video
      .destroy({
        where: {
          id: get(req, 'params.video', 0)
        }
      })
      .then(result => {
        res.status(result ? 200 : 404).json();
      })
      .catch(error => res.status(500).json(error));
  }
}

export default VideoController;