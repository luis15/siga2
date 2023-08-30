const mediaAgrupadaModel = require('../model/mediaAgrupadaModel');

class mediaAgrupadaController {
    async getMediaTurma(req, res) {
      try {
        const { codigoDisciplina, semestre } = req.body;
        const model = new mediaAgrupadaModel();
        const result = await model.getMediaTurma(codigoDisciplina, semestre);
        
        res.json({
          data: result
        });
      } catch (error) {
        console.log(error);
        res.json({
          status: "Erro!"
        });
      }
    }
  }

module.exports = mediaAgrupadaController;