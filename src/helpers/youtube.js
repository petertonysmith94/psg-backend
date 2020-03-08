import { buildFetch } from './fetch';
import { get } from 'lodash';

// TODO: ABSTRACT THESE INTO A CONFIG FILE
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyD2ImoVwQzHyQY9bWIT9UgWHAjDDgSYLMg';

/**
 * Wrapper around the fetch 
 */
export const youtube = (slug, { params = {}, options = {} } = {}) => {
  return buildFetch(`${ BASE_URL }${ slug }`, {
    // method: 'GET',
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

export const youtubeAllPages = (slug, { params = {}, options } = {}) => {
  return youtube(slug, { params, options })
    .then(result => {
      return ({
        result,
        items: [],
        nextPageToken: get(result, 'nextPageToken', false)
      });
    })
    .then(function recursiveFunction({ result, items, nextPageToken }) {
      // Merge any items from previous with the new results from the request.
      items = items.concat(get(result, 'items', []));

      // If there is no next page token then we've reached the end of all the pages.
      if (!nextPageToken) {
        return items;
      }

      // Make a request for the next page to the YouTube API.
      var promise = youtube(slug, {
        options,
        params: {
          ...params,
          pageToken: nextPageToken
        }
      }).then(result => {
        // Call the recursive function to handle the result of the next page
        return recursiveFunction({
          result,
          items,
          nextPageToken: get(result, 'nextPageToken', false)
        });
      })

      return promise;
    })
    .then(result => {
      return {
        items: result,
        size: result.length
      };
    });
}