const MediaModel = require('../model/mediaModel');

class MediaController{
  
  constructor(req, res){
    this.req = req;
    this.res = res;
    this.mediaModel = new MediaModel();
  }

  async getAllMedia() {
    let media = await this.mediaModel.getAllMedia(this.req.params.id);
    if(media.length == 0){
      this.res.status(400).send({'status':'Não foi encontrado nenhuma média para o aluno com esse id'});
    }else{
      this.res.json(media);
    }
  }
}

module.exports = MediaController;
