const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../utils/logger');

dotenv.config();


const mongo_db = mongoose.connect(process.env.MONGO_DB,{
  useNewUrlParser: true,
  useUnifiedTopology:true
})
    .then(dbCon => logger.info(`base de datos MONGO conectada`))
    .catch(err => logger.error(`error al conectarse a la base de datos ${err}`));


    
              
module.exports = mongo_db;