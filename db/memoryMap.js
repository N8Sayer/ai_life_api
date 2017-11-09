var HashMap = require('hashmap');

class RealmMemory {
  constructor() {
    this.world = new HashMap();
  }

  getRealm(id) {
    return this.world.get(id);
  }

  setRealm(id, realm) {
    this.world.set(id, realm);
  }

  totalRealms() {
    return this.world.size;
  }

  deleteRealm(id) {
    var realm = this.world.get(id);
    this.world.delete(id);
    return realm;
  }

  findRealm() {

  }
}

var memoryMap = new RealmMemory();

module.exports = memoryMap;
