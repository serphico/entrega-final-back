const logger = require('../utils/logger');

class CRUD{

    constructor(collection){
        this.collection = collection
    }

    async save(data){
        try {
            this.model.save(data)
            logger.info(`${data} subido en ${collection}.`)

        } catch (error) {
            logger.error(`error en save ${error}`)
        }

    }

    async read(){
        try {
            let findProd = await this.collection.find({})
            logger.info(`productos encontrados.`)
            return findProd;

        } catch (error) {
            logger.error(`error en finde ${error}`)  
        }
    }

    async update(){

    }

    async delete(){

    }
}

module.exports = CRUD;