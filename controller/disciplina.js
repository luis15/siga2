const DisciplinaModel = require('../model/disciplinaModel');
class Disciplina{
    constructor(req,res){
        this.req = req;
        this.res = res;
        this.disciplinaModel = new DisciplinaModel(); 
    }

    async getAll(){
        this.res.json(await this.disciplinaModel.getDisciplinas());
    }

    async get(){
        this.res.json(await this.disciplinaModel.getDisciplina(this.req.params.id));
    }

    async post(){
        let nome = this.req.body.data.nome;
        let ementa = this.req.body.data.ementa;
        let codigoProfessor = this.req.body.data.codigoProfessor;
        let result = await this.disciplinaModel.postDisciplina(nome, ementa, codigoProfessor)
        if(result != null){
            this.res.status(200).send({'status':'Adicionado com sucesso',
            'idCurso':result.insertId});
        }else{
            this.res.status(400).send({'status':'BAD REQUEST'});
        }
    }

    async delete(){
        let result = await this.disciplinaModel.deleteDisciplina(this.req.params.id);
        console.log
        if(result.affectedRows == 0 ){
            this.res.status(400).send({"status":"ID not found"})
        }else if(result == "ErrorMatriculas"){
            this.res.status(400).send({"status":"Não foi possivel excluir a disciplina pois possui matriculas!"})
        }else{
            this.res.status(200).send({"status":"Deletado com sucesso"})
        };
    }

    async update(){
        let id = this.req.params.id;
        let mods = []
        let params = this.req.body.data;
        for(let prop in params){
            if(params[prop].length != 0){
                mods.push(`${prop} = '${params[prop]}'`);
            }
        }
        let result = await this.disciplinaModel.updateDisciplina(id, mods);
        if(result.affectedRows == 0 ){
            this.res.status(400).send({"status":"Bad Request"})
        }else{
            this.res.status(200).send({"status":"Alterado com sucesso"})
        };
    }
}
module.exports = Disciplina;