const MediaModel = require('../model/mediaModel');

class MediaController{
  
  constructor(req, res){
    this.req = req;
    this.res = res;
    this.mediaModel = new MediaModel();
  }

  async getAllMedia() {
    this.res.json(await this.mediaModel.getAllMedia(this.req.params.id));
  }
}

module.exports = MediaController;
