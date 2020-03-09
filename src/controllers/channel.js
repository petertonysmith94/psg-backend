import { Sequelize, Op } from 'sequelize';
import database from '../database';
import { get, isString } from 'lodash';
import { buildSearch } from '../helpers';

class ChannelController {
  /**
   * Register the routes in the router
   * 
   * @param Router  express router instance
   */
  routes = (router) => {
    router.get('/channels', this.index);
    router.get('/channels/:channel', this.show);
    router.delete('/channels/:channel', this.delete);

    return router;
  }

  /**
   * Performs validation on the incoming request and fails early
   */
  validation = (req, res) => {
    const key = get(req, 'params.channel', false);
    if (!key) {
      res.status(422).json({ errors: ['A channel ID is required'] });
    }
    if (!isString(key)) {
      res.status(422).json({ errors: ['A channel ID must be a string'] });
    }

    return {
      key
    };
  } 

  /**
   * Shows all the channels
   * 
   * @returns 200   Success
   * @returns 500   An error occured
   */
  index = (req, res) => {
    const query = get(req, 'query.query', undefined);

    // Find all the channels in the database
    database.models.channel
      .findAll({
        where: {
          ...buildSearch(database.models.channel, query)
        }
      })
      .then(result => res.status(200).json(result))
      .catch(error => res.status(500).json(error));
  }

  /**
   * Show a channel resource
   * 
   * @returns 200   Successfully found resource
   * @returns 404   Resource not found
   * @returns 500   An error occured
   */
  show = (req, res) => {
    const { key } = this.validation(req, res);
    const query = get(req, 'params.query', undefined);

    // Find a channel with the ID supplied
    database.models.channel
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
   * Delete a channel resource
   * 
   * @returns 200   Successfully deleted resource
   * @returns 404   Resource not found
   * @returns 500   An error occured
   */
  delete = (req, res) => {
    const { key } = this.validation(req, res)

    // Store a channel
    database.models.channel
      .destroy({
        where: {
          id: key
        }
      })
      .then(result => {
        if (!result)  res.status(404).json({ errors: ['Unable to delete resource'] });
        else          res.status(200).json({ message: ['Successfully deleted resource'] });
      })
      .catch(error => res.status(500).json(error));
  }
}

export default ChannelController;