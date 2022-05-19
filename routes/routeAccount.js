const { Router } = require('express');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
require('../utils/passportStrategy')
const sendMail = require('../controller/sendmail/sendMailConfig')
const showInfoAccount = require('../controller/showAccountInfo/showAccountInfo');
const logger = require('../utils/logger');

/*------------------INICIO DECLARAR RUTAS------------------------*/

const loginRoute = Router();
const registerRoute = Router();
const logoutRoute = Router();

/*------------------INICIO SET MULTER------------------------*/

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, path.resolve('./public/uploads'))
    },
    filename:function(req,file,cb){
        cb(null,`${file.originalname}`)
    }
})
const upload = multer({storage: storage})


/*------------------ INICIO RUTAS GET - POST - PUT - DELETE ----------------------------*/

loginRoute.get('/', (req, res) =>{
    try {
        let isLogin = req.session.email
        let resp = res;
        showInfoAccount.infoAccount(isLogin)
        .then(infoAccount =>{
            logger.info(`datos de user: ${infoAccount}`)
            resp.json({infoAccount:infoAccount, isLogin:isLogin})
        })
    } catch (error) {
        logger.error(`error en ruta loginRoute.get: ${error}`)
    }
})

loginRoute.post('/',passport.authenticate('login',{failureRedirect: '/failLogin'}),(req, res) => {
    req.session.email = req.body.username
    res.redirect('/')
})



registerRoute.post('/', upload.single('avatar'),passport.authenticate('registro',{failureRedirect: '/failRegistro'}),(req,res)=>{
 
    sendMail.sendRegister(req.body)
    res.redirect('/login');
})

logoutRoute.post('/',(req, res) =>{
    try {
        req.logout();        
        logger.info(`el usuario se ha deslogueado`)
        req.session.destroy();
        res.redirect('/login')
    } catch (error) {
        logger.error(`error producido en ruta de logout: ${error}`)
    }
})

/*------------------ INICIO EXPORTACIONES ----------------------------*/
module.exports = {registerRoute, loginRoute, logoutRoute} ;