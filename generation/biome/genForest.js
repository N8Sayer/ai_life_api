const genEntites = require('../entites/genEntites');
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

  var trees = addTrees(map);

  genEntites(map, trees, 10, 'Llama');
  genEntites(map, trees, 10, 'Sheep');

  return map;
};

const addTrees = (map) => {
  let trees = [];
  for (let y = 50; y < 1000; y += 150) {
    for (let x = 50; x < 2000; x += 150) {
      let rand = Math.floor(Math.random() * (100 - 5)) + 5;

      var rect1 = {
        x: x + rand,
        y: (y + 70) - rand,
        width: 70,
        height: 20
      }

      var skip = false;
      for (let i = 0; i < trees.length; i++) {
        if (overlaps(rect1, trees[i])) {
          skip = true;
          break;
        }
      }
      if (skip) continue;

      trees.push(rect1);

      map.items.push({
        "name": "Tree",
        "position": {
          "x": x + rand,
          "y": y - rand
        }
      });
    }
  }
  return trees;
}



module.exports = genForest;
