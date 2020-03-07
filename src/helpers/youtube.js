import { buildFetch } from './fetch';
import { get } from 'lodash';

// TODO: ABSTRACT THESE INTO A CONFIG FILE
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyAhXlc3wc0mwU4nh48pxt-c407o_WuVfaE';

/**
 * Wrapper around the fetch 
 */
const youtube = (slug, { params = {}, options = {} } = {}) => {
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

export default youtube;