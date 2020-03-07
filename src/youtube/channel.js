import { youtube } from '../helpers';
import { get } from 'lodash';

/**
 * Fetches a raw list of YouTube channels by channel name
 * 
 * @param {string} part 
 * @param {string} channelName 
 */
export const list = (part, channelName) => {
  return youtube('/channels', {
    params: {
      part,
      forUsername: channelName
    }
  })
  .then(channel => {
    return {
      ...channel,
      query: channelName
    }
  });
}

/**
 * Fetches a filtered list of ids and channel names from an array of channel names
 * 
 * @param {array} channelNames 
 */
export const channels = (channelNames = []) => {
  return Promise.all(channelNames.map(name => list('snippet', name)))
    .then(channels => {
      return channels.filter(channel => channel.pageInfo.totalResults !== 0)
        .map(channel => {
          return {
            id: get(channel, 'items[0].id'),
            name: get(channel, 'items[0].snippet.title'),
            query: get(channel, 'query')
          };
        });
    });
}