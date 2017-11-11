var mongoose = require('mongoose');

var RealmSchema = new mongoose.Schema({
  position: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  background: {
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    key: {
      type: String,
      required: true
    }
  },
  entites: [{
      name: {
        type: String,
        required: true
      },
      position: {
        x: {
          type: Number,
          required: true
        },
        y: {
          type: Number,
          required: true
        }
      }
  }],
  items: [{
    name: {
      type: String,
      required: true
    },
    position: {
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      }
    }
  }]
});

RealmSchema.methods.toJSON = function() {
  return this.toObject();
};

RealmSchema.statics.findByPosition = function(position) {
    var Realm = this;

    return Realm.findOne({'position.x': position.x, 'position.y': position.y});
};

var Realm = mongoose.model('Realms', RealmSchema);

module.exports = {
  Realm: Realm
}
