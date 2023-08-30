const accessModel = require('../model/accessModel');

class AccessController{
    constructor(req,res){
        this.req = req;
        this.res = res;
        this.accessModel = new accessModel();
    }

    async verifyAccess(infos,req){
        let info = infos
        let result = await this.accessModel.verifyAccess(info,req);
        if(result == true){
            return true;
        }else if(result == "DisciplinaNFound"){
            this.res.status(400).send({"status":"Nota não encontrada"})
        }
        else{
            return false;
        }
    }   
}

module.exports = AccessController;