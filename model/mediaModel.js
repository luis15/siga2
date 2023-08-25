const db = require('../Media de Alunos/utils/db');

class MediaModel {
  static getAllMedia(callback) {
    db.query('SELECT * FROM notas', callback);
  }
}

module.exports = MediaModel;
