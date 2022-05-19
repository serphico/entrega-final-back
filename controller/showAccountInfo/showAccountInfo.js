const logger = require('../../utils/logger')
const Users = require('../../DAOs/schemas/schemaUser')


class ShowInfoAccount{
    constructor(){

    }

    async infoAccount(username){
        try {
            let userData = await Users.findOne({ 'email': username})

            logger.info(`datos del usuario para login son ${userData}`)

            return userData

        } catch (error) {
            logger.error(`error en metodo infoAccount: ${error}`)
        }
    }
}

const showInfoAccount = new ShowInfoAccount();

module.exports = showInfoAccount;