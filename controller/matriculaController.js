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
        let codAluno = this.req.body.data.codAluno;
        let codDisciplina = this.req.body.data.codDisciplina;
        let semestre = this.verificaSemestre(this.req.body.data.semestre);
        let result = await this.MatriculaModel.postMatricula(codAluno,codDisciplina,semestre);
        if(result.length != 0){
            this.res.status(200).send({'status':'Inserido', "idMatricula": `${result.insertId}`});
        }else{
            this.res.status(400).send({'status':'ERROR post'});
        }
    }

    async updateMatricula(){
        let id = this.req.params.id;
        let modification = [];
        let params = this.req.body.data;
        for(let prop in params){
            if(params[prop].length != 0){
                modification.push(`${prop} = '${params[prop]}'`);
            }
        }
        console.log(modification)
        let result = await this.MatriculaModel.updateMatricula(id, modification);
        if(result.affectedRows != 0){
            this.res.status(200).send({'status':'Modificado'});
        } else {
            this.res.status(400).send({'status':'ERROR update'});
        }
    }

    async deleteMatricula(){
        let result = await this.MatriculaModel.getMatricula(this.req.params.id);
        if(result.affectedRows != 0){
            this.res.status(200).send({'status':'Deletado'});
            this.MatriculaModel.deleteMatricula(this.req.params.id);
        }else if(result == "ErrorNotas"){
            this.res.status(400).send({'status':'Não foi possivel excluir a matricula pois possui notas!'});
        }else {
            this.res.status(400).send({'status':'ERROR delete'});
        }
    }

    verificaSemestre(semestre) {
        const regex = /^\d{4}\.(1|2)$/;
        return regex.test(semestre);
    }
}

module.exports = MatriculaController;
