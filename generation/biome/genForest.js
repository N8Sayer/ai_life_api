const genEntites = require('../entites/genEntites');
const { genAllTrees } = require('../items/genTrees');
const {overlaps} = require('../../util/boundaries');

const genForest = (params) => {
  var map = {};
  map.entites = [];
  map.items = [];
  map.background = {
    "width": 2000,
    "height": 1000,
    "key": 'background'
  };

  var obstacles = [];
  genAllTrees(map, obstacles);

  genEntites(map, obstacles, 10, 'Llama', {width: 10, height: 20});
  genEntites(map, obstacles, 10, 'Sheep', {width: 10, height: 20});

  return map;
};

module.exports = genForest;
