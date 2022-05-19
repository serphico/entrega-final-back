const twilio = require('twilio')
const logger = require('../../utils/logger')
const User = require('../../DAOs/schemas/schemaUser')
const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.NODE_accountSid;

const authToken = process.env.NODE_authToken;

const client = twilio(accountSid, authToken);


class SendTwilio{
    constructo(){
    }

    async sendSms(username){

        User.findOne({ 'email':username},(err, user)=>{
            try {
                const message = client.messages.create({
                    body: 'Pedido recibido!',
                    from: '+17578353658',
                    to: JSON.stringify(user.phone)
                 })
                 console.log(message)
            } catch (error) {
                logger.error(`error en metodo sendSms: ${error}`)
            }
        })
        
    }

    async sendWhatsapp(username){
        User.findOne({ 'email':username},(err, user)=>{
            console.log(user.phone)
            try {
                const message = client.messages.create({
                    body: `nuevo pedido de ${user.fullName} con email ${user.email}`,
                    from: 'whatsapp:+14155238886',
                    to: `whatsapp:${user.phone}`
                 })
                 .then(message => logger.info(message.sid)) 
                 .done()
            } catch (error) {
                logger.error(`error en metodo sendWhatsapp: ${error}`)
            }
        })
    }
}


const sendTwilio = new SendTwilio();

module.exports = sendTwilio