const {overlaps} = require('../../util/boundaries');

const genEntites = (map, obstacles, amount, key) => {
  for (let i = 0; i < amount; i++) {
    let randX = Math.floor(Math.random() * (map.background.width - 50)) + 50;
    let randY = Math.floor(Math.random() * (map.background.height - 50)) + 50;

    var rect1 = {
      x: randX,
      y: randY,
      width: 10,
      height: 20
    }

    var skip = false;
    for (let x = 0; x < obstacles.length; x++) {
      if (overlaps(obstacles[x], rect1)) {
        skip = true;
        break;
      }
    }
    if (skip) {
      i--;
      continue;
    };

    map.entites.push({
      "name": key,
      "position": {
        "x": randX,
        "y": randY
      }
    });
  }

  return {map, obstacles};
}

module.exports = genEntites;
