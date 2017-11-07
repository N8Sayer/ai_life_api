const {overlaps} = require('../../util/boundaries');

/**
  Generates trees all over the map.
*/
const genAllTrees = (map, obstacles) => {
  for (let y = 50; y < map.background.height; y += 150) {
    for (let x = 50; x < map.background.width; x += 150) {
      let rand = Math.floor(Math.random() * (100 - 5)) + 5;

      var rect1 = {
        x: x + rand,
        y: (y + 70) - rand,
        width: 70,
        height: 20
      }

      var skip = false;
      for (let i = 0; i < obstacles.length; i++) {
        if (overlaps(rect1, obstacles[i])) {
          skip = true;
          break;
        }
      }
      if (skip) continue;

      obstacles.push(rect1);

      map.items.push({
        "name": "Tree",
        "position": {
          "x": x + rand,
          "y": y - rand
        }
      });
    }
  }
  return {map, obstacles};
}

/**
  Generates a specific amount of trees all over the map randomly.
*/
const genTrees = (map, obstacles, amount) => {
  for (let y = 0; y < amount; y++) {
    let randX = Math.floor(Math.random() * (map.background.width - 50)) + 50;
    let randY = Math.floor(Math.random() * (map.background.height - 50)) + 50;

    var rect1 = {
      x: randX,
      y: randY + 70,
      width: 70,
      height: 20
    }

      var skip = false;
      for (let i = 0; i < obstacles.length; i++) {
        if (overlaps(rect1, ostacles[i])) {
          skip = true;
          break;
        }
      }
      if (skip) continue;

      obstacles.push(rect1);

      map.items.push({
        "name": "Tree",
        "position": {
          "x": randX,
          "y": randY + 70
        }
      });
  }
  return {map, obstacles};
}

module.exports = {
  genTrees,
  genAllTrees,
};
