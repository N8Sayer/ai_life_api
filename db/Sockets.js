var HashMap = require('hashmap');

class Sockets {
  constructor() {
    this.sockets = new HashMap();
  }

  getUser(id) {
    return this.sockets.get(id);
  }

  setUser(id, user) {
    this.sockets.set(id, user);
  }

  totalUsers() {
    this.sockets.size;
  }

  deleteUser(id) {
    var user = this.sockets.get(id);
    this.world.delete(id);
    return user;
  }

}

var users = new Sockets();

module.exports = users;
