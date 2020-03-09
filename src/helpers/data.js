import fs from 'fs';
import path from 'path';

/**
 * Flattens an multi-dimensional array to a single dimension array of objects
 * 
 * @param {array} array   the array to flatten
 * 
 * @returns {array} the flattened single dimensional array
 */
export const flatten = (array) => {
  return array.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

/**
 * Load in the filters from the given file path
 * 
 * @param {*} path 
 */
export const loadFilters = () => {
  return fs.readFileSync(
    path.resolve(__dirname, '../resources/search_filter'),
    { encoding: 'UTF-8' }
  ).split('\n');
}