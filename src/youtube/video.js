import { search as request } from './index'

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

