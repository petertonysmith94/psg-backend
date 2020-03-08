import { buildFetch } from '../helpers';
import { get } from 'lodash';

// TODO: ABSTRACT THESE INTO A CONFIG FILE
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyDcd07z5GvhlwZzkR1TAQs81TnjVQJehIw';

//#region Data reducers

/**
 * This reducer can be applied to an array of responses to reduce them to an array request items.
 * 
 * @returns {array} a flattened array of objects
 */
export const filterOnlyItems = (acc, response) => acc.concat(get(response, 'items', []));

//#endregion

//#region Fetching methods

export const request = (slug, { ...options } = {}, limit = 1) => {
  console.log(`Request to ${ slug }, limited to ${ limit } requests`);

  // Only allow fetch all when we have a positive limit
  // TODO: implement unlimited calls (limit <= 0)
  if (limit > 1) {
    return fetchAll(slug, options, limit);
  }
  
  // Only perform a single request (limit <= 1)
  return fetch (slug, options);
}

/**
 * Wrapper around the fetch to easily request data from the YouTube API v3.
 * 
 * @param {string}  slug    endpoint to request on the api.  console.log(fet)

 *    @param {object} params  fetch parameters
 *    @param {object} options fetch options
 * }
 * 
 * @return {Promise} the promise received from fetch, converted to json
 */
export const fetch = (slug, { params = {}, options = {} } = {}) => {
  return buildFetch(`${ BASE_URL }${ slug }`, {
    params: {
      key: API_KEY,
      ...params
    },
    options: {
      method: get(options, 'method', 'GET'),
      headers: {
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${ API_KEY }`,
        ...get(options, 'headers', {})
      },
      ...options
    }
  }).then(result => result.json());
}

/**
 * Fetches all YouTube API responsupercoolsearch
 * @param {string}  slug      endpoint to request on the api.
 * @param {object}  options   fetch options
 * @param {integer} limit     limit on the number of requests we can make
 * 
 * @returns {Promise} list of all page results from (0 -> limit)
 */
export const fetchAll = (slug, options = {}, limit = 1) => {
  // TODO: implement the ability to fetch unlimited result
  if (limit <= 0) {
    throw new Error('Unlimited fetch requests might be costly, disable for the time being');
  }

  // Fetches the constant params so we aren't digging it up each iteration of the recursion.
  const params = get(options, 'params', {});

  return fetch(slug, options)
    .then(response => {
      return ({
        response,
        items: [],
        n: 0,
      });
    })
    .then(function recursiveFunction({ n, response, items }) {
      console.log('Items length', items.length);
      // Appends the result + increments number of requests
      items.push(response);
      n++;

      // Is there another next page token?
      // Have we reached the limit of requests?
      const nextPageToken = get(response, 'nextPageToken', false);
      if (!nextPageToken || n >= limit) {
        // There is no next page token, we've reached the end of all the pages.
        return items;
      }

      // Make a request for the next page to the YouTube API.
      var promise = fetch(slug, {
        ...options,
        params: {
          ...params,
          // Important ordering, override users variable for the page token.
          pageToken: nextPageToken 
        }
      }).then(response => {
        // Call the recursive function to handle the result of the next page
        return recursiveFunction({
          response,
          items,
          n,
        });
      })

      return promise;
    });
}

//#endregion