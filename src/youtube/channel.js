import { request } from './core';
import { get } from 'lodash';

/**
 * Useful resources
 * @see https://developers.google.com/youtube/v3/docs/channels
 */

/**
 * Fetches a raw list of YouTube channels by username
 * @see https://developers.google.com/youtube/v3/docs/channels/list
 * 
 * @param {string} part         the YouTube part
 * @param {string} channelName  a username to filter
 * @param {string} params       any additional parameters
 * 
 * @returns {Promise} the result from the YouTube API call
 */
export const list = (part, channelName = null, params = {}) => {
  return request('/channels', {
    params: {
      part,
      forUsername: channelName,
      ...params
    }
  })
  // Adds the channel name to the response
  .then(response => {
    return {
      ...response,
      query: channelName
    }
  });
}

/**
 * Fetches a filtered list of channel ids and channel names from an array of channel names.
 * TODO: Only uses the first item result at the moment, maybe resolve all the channels?
 * 
 * @param {array} channelNames  an array of channel names can be inputted
 * 
 * @returns {Promise} 
 * @returns {array} Format below [
 *    @returns {string} id            the channel ID
 *    @returns {string} title         the title of the channel
 *    @returns {string} channelName   the channel name requested
 * ]
 */
export const getChannelsByNames = (channelNames = []) => {
  // Create promies for finding channels with a given name.
  return Promise.all( channelNames.map(channelName => list('snippet', channelName)) )
    .then(
      // Performs a filter on the responses to only those with results.
      // Maps each response to fetch the first items id and title
      responses => responses.filter(response => get(response, 'pageInfo.totalResults', 0) !== 0) // Skips any with no items
        .map(response => {
          return {
            id: get(response, 'items[0].id'),
            title: get(response, 'items[0].snippet.title'),
            channelName: get(response, 'query')
          };
        })
    );
}