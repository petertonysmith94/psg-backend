import { Op } from 'sequelize';
import { isString } from 'lodash';

export const buildSearch = (model, query) => {
  return (!query || !isString(query)) ? {} : {
    [Op.or]: Object.keys(model.rawAttributes).map(key => {
      return {
        [key]: { [Op.like] : `%${ query }%` }
      };
    })
  };
}