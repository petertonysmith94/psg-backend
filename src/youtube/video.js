import { search as request, filterOnlyItems } from './index'
import { get } from 'lodash';

/**
 * 
 * @param {*} part 
 * @param {*} options 
 */
export const search = (part, query, limit = 1, options = {}) => 
  request(part, query, { ...options, type: 'video' }, limit);

/**
 * 
 * 
 * @param {*} part 
 * @param {*} queries 
 * @param {*} options 
 */
export const searchQueries = (part, queries = [], limit = 1, options = {}) => 
  Promise.all(queries.map(query => search(part, query, limit, options)));


export const fetchVideos = (part = 'id', channels = [], filters = [], limit = 2) => 
  Promise.all(channels.map(channel => 
    Promise.all(filters.map(filter => 
      search(part, filter, limit, { channelId: get(channel, 'id') } 
    )))
  ));