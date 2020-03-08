import { request } from './core';

/**
 * Useful function for building the query string with some options
 * 
 * @param {string} query  The query string we want to format
 * @param {object} options {
 *    @param {boolean} exact      Only look for exact string matches
 *    @param {boolean} onlyTitle  Only look for the query in the title
 * }
 * 
 * @return {string} formatted query string
 */
export const buildQuery = (query, { exact = false, onlyTitle = false } = {} ) => {
  let q = query;

  if (exact) {
    q = `"${ q }"`;
  }

  if (onlyTitle) {
    q = `allintitle:${ q }`;
  }
  return q; 
};

/**
 * Performs requests to the search list query endpoint
 * 
 * @param {string} part 
 * @param {string} query 
 * @param {object} options
 * 
 * @return {Promise}
 */
export const list = (part, query, params = {}, limit = 1) => {
  return  request('/search', {
    params: {
      ...params,
      q: query,
      part
    },
  }, limit);
}