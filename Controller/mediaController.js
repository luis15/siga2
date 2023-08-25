const MediaModel = require('../model/mediaModel');

class MediaController {
  static getAllMedia(req, res) {
    MediaModel.getAllMedia((err, result) => {
      if (err) {
        res.status(500).send('Erro ao buscar médias.');
      } else {
        res.send(result);
      }
    });
  }
}

module.exports = MediaController;
