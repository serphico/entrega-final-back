const Crud = require('./crudController');
const mongo_db = require('../DAOs/config');
const Products  = require('../DAOs/schemas/schemaProd');
const logger = require('../utils/logger');


class ProductsCrud extends Crud{

    constructor(){
        super(Products)
    }

    async findProduct(){
        try {
            let products = await this.read();
            return products
        } catch (error) {
            logger.error(`error en controller read ${error}`)
        }
    }
}

const productsController = new ProductsCrud();

module.exports = productsController