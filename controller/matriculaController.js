const MatriculaModel = require('../model/matriculaModel');
class MatriculaController{
    constructor(req, res){
        this.req = req;
        this.res = res;
        this.matriculaModel = new MatriculaModel();
    }
    
    async getAll(){
        this.res.json(await this.matriculaModel.getMatriculas());
    }

    async get(){
        this.res.json(await this.matriculaModel.getMatricula(this.req.params.id));
    }

    async post(){
        let codAluno = this.req.body.codAluno;
        let codDisciplina = this.req.body.codDisciplina;
        let semestre = this.req.body.semestre;
        let result = await this.matriculaModel.postMatricula(codAluno, codDisciplina, semestre);
        if(result != null){
            this.res.status(200).send({'status':'OK','idMatricula':result.insertId});
        } else {
            this.res.status(400).send({'status':'ERROR'});
        }
    }

    async delete(){
        let result = await this.matriculaModel.getMatricula(this.req.params.id);
        if(result.length == 0){
            this.res.status(400).send({'status':'ERROR'});
        } else {
            this.res.status(200).send({'status':'Deletado'});
        }
    }
}

module.exports = MatriculaController;