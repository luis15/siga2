const NotaModel = require('../model/notasModel');

class NotasController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.NotaModel = new NotaModel();
    }

    async getNotas(){
        this.res.json(await this.NotaModel.getNotas());
    }
    
    async getNota(){
        this.res.json(await this.NotaModel.getNota(this.req.params.id));
    }

    async createNota(){
        let codigoMatricula = this.req.body.data.codigoMatricula;
        let descritivo = this.req.body.data.descritivo;
        let valor = this.req.body.data.valor;
        if(valor <= 10 && valor >= 0){
            let result = await this.NotaModel.createNota(codigoMatricula, descritivo, valor);
            if(result != null){
                this.res.status(200).send({'status':'Adicionado com sucesso',
                'idNota':result.insertId});
            }else{
                this.res.status(400).send({'status':'BAD REQUEST'});
            }
        }else{
            this.res.status(400).send({"status":"Valor da nota inválido"})
        }
    }

    async deleteNota(){
        let id = this.req.params.id;
        let result = this.NotaModel.deleteNota(id);
        if(result.affectedRows == 0 ){
            this.res.status(400).send({"status":"ID não encontrado"})
        }else{
            this.res.status(200).send({"status":"Deletado com sucesso"})
        }
    }
}

module.exports = NotasController;