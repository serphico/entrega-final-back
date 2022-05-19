const { Router } = require('express');
const logger = require('../utils/logger');
const sendMail = require('../controller/sendmail/sendMailConfig')
const sendTwilio = require('../controller/sendSMSWhatsapp/sendPhone')

const buyRouter = Router();

buyRouter.post('/', (req, res) => {
    try {
        sendMail.sendBuy(req.session.email, req.body)
        sendTwilio.sendSms(req.session.email)
        sendTwilio.sendWhatsapp(req.session.email)

    } catch (error) {
        logger.error(`ocurrio un error en buyRouter.post: ${error}`)
    }
})

module.exports = buyRouter;