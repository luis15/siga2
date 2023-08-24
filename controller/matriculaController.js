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

    async getMatricula(id){
        this.res.json(await this.matriculaModel.getMatricula(id));
    }

    async postMatricula(){
        let codAluno = this.req.body.codAluno;
        let codDisciplina = this.req.body.codDisciplina;
        let semestre = this.req.body.semestre;
        let notas = this.req.body.notas;
        let result = [codAluno, codDisciplina, semestre, notas];
        if(result != null){
            this.res.status(200).send({'status':'Inserido'});
            this.res.json(await this.matriculaModel.postMatricula(codAluno,codDisciplina,semestre,notas));
        } else {
            this.res.status(400).send({'status':'ERROR post'});
        }
    }

    async updateMatricula(id){
        let result = await this.matriculaModel.getMatricula(id);
        let codAluno = this.req.body.codAluno;
        let codDisciplina = this.req.body.codDisciplina;
        let semestre = this.req.body.semestre;
        let notas = this.req.body.notas;
        if(result!= null){
            this.res.status(200).send({'status':'Modificado'});
            this.res.json(await this.matriculaModel.updateMatricula(id,codAluno,codDisciplina,semestre,notas));

        } else {
            this.res.status(400).send({'status':'ERROR update'});
        }
    }

    async delete(id){
        let result = await this.matriculaModel.getMatricula(id);
        if(result.length != null){
            this.res.status(200).send({'status':'Deletado'});
            this.res.MatriculaModel.deleteMatricula(id);
        } else {
            this.res.status(400).send({'status':'ERROR delete'});
        }
    }
}

module.exports = MatriculaController;