const mediaAgrupadaModel = require('../model/mediaAgrupadaModel');

class mediaAgrupadaController {
  constructor(req,res){
    this.req = req;
    this.res = res;
    this.mediaAgrupadaModel = new mediaAgrupadaModel(); 
}
  async getMediaTurma() {
      const id = this.req.body.data.idDisciplina;
      const semestre = this.req.body.data.semestre;
      this.res.json( await this.mediaAgrupadaModel.mediaAgrupada(id, semestre));
  }
}

module.exports = mediaAgrupadaController;