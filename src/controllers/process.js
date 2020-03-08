import database from '../database';
import { get } from 'lodash';
import {
  getChannelsByNames,
  buildQuery,
  fetchVideos
} from '../youtube';
import { flatten } from '../helpers';

class ProcessController {
  prefix = '/processes';

  /**
   * Register the routes in the router
   * 
   * @param Router  express router instance
   */
  routes = (router) => {
    router.post('/update', this.update);

    return router;
  }

  /**
   * 
   */

  update = (req, res) => {
    // const channelNames = ['GlobalCyclingNetwork', 'globalmtb'];
    const channelNames = ['globalmtb', 'GlobalCyclingNetwork'];
    const filters = [
      'pro',
      'matt stephens',
      '5',
      'Mitchelton-Scott',
      'Dubai stage'
    ].map(filter => buildQuery(filter, { onlyTitle: true } ));

    // Testing the get channels functionality
    getChannelsByNames(channelNames)
      .then(channels => {
        // Create the channel in the database if it doesn't exist.
        channels.forEach(channel => {
          database.models.channel
            .findOrCreate({
              where: {
                id: get(channel, 'id'),
                channelName: get(channel, 'title')
              }
            });
        });

        // Returns an array of channel ids
        return fetchVideos('snippet', channels, filters, 1000);
      })
      .then(result => flatten(result))
      .then(results => results.reduce((acc, result) => acc.concat( get(result, 'items', []) ), []))
      .then(results => Promise.all(
        results.map(video => {
          const type = get(video, 'id.kind', false);

          if (type && type === 'youtube#video') {
            database.models.video
              .findOrCreate({
                where: {
                  id: get(video, 'id.videoId'),
                  title: get(video, 'snippet.title'),
                  date: get(video, 'snippet.publishedAt')
                }
              });
          }

          return video;
        })
      ))
      .then(result => res.json(result))
      .catch(error => res.json(error));
  }
}

export default ProcessController;