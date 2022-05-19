const { Router } = require('express');
const productsController = require('../controller/productController');
const logger = require('../utils/logger');


const home = Router();

home.get("/", (req, res) => {
  try {
    let isLogin = req.session.email
    let resp = res;
    productsController.findProduct()
    .then(productos => {
      resp.json({ productos: productos, isLogin: JSON.stringify(isLogin)});      
    })

  } catch (error) {
    logger.error(`error en ruta get home, ${error}`)
  }


  });

 module.exports = home;