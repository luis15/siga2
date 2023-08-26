const MatriculaModel = require('../model/matriculaModel');
class MatriculaController{

    constructor(req, res){
        this.req = req;
        this.res = res;
        this.MatriculaModel = new MatriculaModel();
    }

    async getAll(){
        this.res.json(await this.MatriculaModel.getMatriculas());
    }

    async getMatricula(){
        this.res.json(await this.MatriculaModel.getMatricula(this.req.params.id));
    }

    async postMatricula(){
        let id = this.req.params.id;
        let codAluno = this.req.body.codAluno;
        let codDisciplina = this.req.body.codDisciplina;
        let semestre = this.req.body.semestre;
        let result = await this.MatriculaModel.updateMatricula(id,codAluno,codDisciplina,semestre);
        if(result.length != 0  && verificaSemestre(semestre)){
            this.res.status(200).send({'status':'Inserido'});
        } else {
            this.res.status(400).send({'status':'ERROR post'});
        }
    }

    async updateMatricula(){
        let id = this.req.params.id;
        let modification = [];
        let params = this.req.body;
        for(let prop in params){
            if(params[prop].length != 0){
                modification.push(`${prop} = '${params[prop]}'`);
            }
        }
        let result = await this.MatriculaModel.updateMatricula(id, modification);
        if(result.length != 0  && verificaSemestre(semestre)){
            this.res.status(200).send({'status':'Modificado'});
        } else {
            this.res.status(400).send({'status':'ERROR update'});
        }
    }

    async deleteMatricula(){
        console.log('passei aqui')
        let result = await this.MatriculaModel.getMatricula(this.req.params.id);
        if(result.length != 0){
            this.res.status(200).send({'status':'Deletado'});
            this.MatriculaModel.deleteMatricula(this.req.params.id);
        } else {
            this.res.status(400).send({'status':'ERROR delete'});
        }
    }

    async verificaSemestre(semestre) {
        const regex = /^\d{4}\.(1|2)$/;
        return regex.test(semestre);
    }
}

module.exports = MatriculaController;
