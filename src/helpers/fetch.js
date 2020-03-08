import fetch from 'node-fetch';
import { isArray } from 'lodash';

/**
 * Turns an array into a URL encoded query string
 * 
 * @param {object} params 
 * @param {string} key 
 * @param {string} slug 
 * 
 * @param {string} slug     the url encoded slug
 */
const arrayToUrlString = (params, key, slug) => params[key].reduce( (acc, item, index) => {
  const amp = index === 0 ? '' : '&';
  return `${ acc }${ amp }${ key }[]=${ encodeURIComponent(item) }`;
}, slug);

/**
 * Turn an object of parameters into a URL encoded query string.
 *  eg: paramsObjectToUrlString({ foo: 'bar', moo: 'baa' }) === 'foo=bar&moo=baa'
 * 
 * @param {object} params   an object of URL parameters to encode
 * @param {string} slug     the inital string slug
 * 
 * @param {string} slug     the url encoded slug
 */
const paramsObjectToUrlString = (params, slug = '') => Object.keys(params).reduce( (acc, key, index) => {
  // Ensures the parameter 
  if (params[key] !== null) {
    const amp = index === 0 ? '' : '&';

    if (isArray(params[key])) {
      return arrayToUrlString(params, key, `${ acc }${ amp }`);
    }
    return `${ acc }${ amp }${ key }=${ params[key] }`;
  }
  return acc;
}, slug);

/**
 * A wrapper around fetch to handle query transformation.
 */
export const buildFetch = (url, { params = {}, options = {} } = {}) => {
  const queryString = paramsObjectToUrlString(params);
  return fetch(`${ url }${ queryString ? `?${ queryString }` : '' }`, options);
};