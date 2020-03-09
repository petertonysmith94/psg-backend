import { Sequelize, Op } from 'sequelize';
import database from '../database';
import { get, isString } from 'lodash';
import { buildSearch } from '../helpers';

class VideoController {
  /**
   * Performs validation on the incoming request and fails early
   */
  validation = (req, res) => {
    const key = get(req, 'params.video', false);
    if (! key) {
      res.status(422).json({ errors: ['A video ID is required'] });
    }
    if (! isString(key)) {
      res.status(422).json({ errors: ['A video ID must be a string'] });
    }

    return {
      key
    };
  } 

  /**
   * Register the routes in the router
   * 
   * @param Router  express router instance
   */
  routes = (router) => {
    router.get('/videos', this.index);
    router.get('/videos/:video', this.show);
    router.delete('/videos/:video', this.delete);

    return router;
  }

  /**
   * Shows all the videos
   * 
   * @returns 200   Success
   * @returns 500   An error occured
   */
  index = (req, res) => {
    let query = get(req, 'query.query', false);

    // Find all the videos in the database
    database.models.video
      .findAll({
        where: {
          ...buildSearch(database.models.video, query)
        }
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
    const { key } = this.validation(req, res)

    // Find a video with the ID supplied
    database.models.video
      .findByPk(key)
      .then(result => {
        // Resource can't be found.
        if (null === result) {
          res.status(404).json({ errors: ['Unable to find resource'] });
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
    const { key } = this.validation(req, res)

    // Store a video
    database.models.video
      .destroy({
        where: {
          id: key
        }
      })
      .then(result => {
        if (!result) res.status(404).json({ errors: ['Unable to delete resource'] });
        else         res.status(200).json({ message: ['Successfully deleted resource'] });
      })
      .catch(error => res.status(500).json(error));
  }
}

export default VideoController;