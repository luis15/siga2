const db = require('../util/db');

class MediaModel {
  static getAllMedia(callback) {
    db.query('SELECT * FROM notas', callback);
  }
}

module.exports = MediaModel;
