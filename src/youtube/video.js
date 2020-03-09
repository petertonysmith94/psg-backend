import { search as request, filterOnlyItems } from './index'
import { get } from 'lodash';

/**
 * Performs a search with type of video.
 * 
 * @param {string} part 
 * @param {object} options 
 * 
 * @param {Promise}
 */
export const search = (part, query, limit = 1, options = {}) => 
  request(part, query, { ...options, type: 'video' }, limit);

/**
 * Creates an array of promies for fetching all videos which match the conditions.
 *  channels => the channels to look at
 *  filters => search strings to look for
 * 
 * @param {string} part 
 * @param {array} channels 
 * @param {array} filters 
 * @param {integer} limit
 * 
 * @return {array}
 */
export const fetchVideos = (part = 'id', channels = [], filters = [], limit = 2) => 
  Promise.all(channels.map(channel => 
    Promise.all(filters.map(filter => 
      search(part, filter, limit, { channelId: get(channel, 'id') } 
    )))
  ));