const { genForest } = require('./biome/');

const generationManager = (realm) => {
  return genForest();
};

module.exports = generationManager;
