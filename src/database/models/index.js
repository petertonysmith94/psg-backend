import fs from 'fs';
import path from 'path';

const generateModels = (sequelize) => {
  const basename = path.basename(__filename);
  var models = {};
  
  // Adds all the models in the directory into the models object.
  fs.readdirSync(__dirname)
    .filter(file => {
      return  (file !== basename) &&  // Remove the current file
        (file.indexOf('.') !== 0) &&  // Remove any files with '.' at the start
        (file.slice(-3) === '.js')    // Only include files with the '.js' suffix 
    })
    .forEach(file => {
      var model = sequelize['import'](path.join(__dirname, file));
      models[model.name] = model;
    });

  // Performs any associations between models.
  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  return models;
}

export default generateModels;