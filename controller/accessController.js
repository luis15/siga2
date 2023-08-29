const accessModel = require('../model/accessModel');

class AccessController{
    constructor(){
        this.accessModel = new accessModel();
    }

    async verifyAccess(infos){
        let info = infos
        let result = await this.accessModel.verifyAccess(info);
        if(result == true){
            return true;
        }else{
            return false;
        }
    }   
}

module.exports = AccessController;