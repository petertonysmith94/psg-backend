export {
  // Core functions
  request,
  fetch,
  fetchAll,
  filterOnlyItems
} from './core';

export {
  // Endpoints
  list as listChannels,

  // Custom methods
  getChannelsByNames
} from './channel';

export {
  // Endpoints
  list as search,

  // Setup
  buildQuery,
} from './search';

export { 
  search as searchVideos,
  fetchVideos
} from './video';