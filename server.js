const app = require('./main');
const dotenv = require('dotenv');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const logger = require('./utils/logger');

dotenv.config();


/*servidor */

if(process.env.MODO === 'FORK'){

    const server = app.listen(process.env.PORT, () => {
        logger.info(`SERVER ON corriento en el puerto: ${process.env.PORT}- en MODO: FORK - PID WORKER: ${process.pid} - en entorno de ${process.env.NODE_ENV}`);
    });
    
    server.on('error', error => { logger.error(error)})

}else if(process.env.MODO === 'CLUSTER'){
    if(cluster.isPrimary){
        logger.info(`numero de CPUs: ${numCPUs}`);
        logger.info(`PID MASTER: ${process.pid}`);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
            
        }

        cluster.on('Worker', worker => {
            logger.info(worker.process.pid, 'died', new Date().toLocaleString());
            cluster.fork()
        })

    }else{
        const server = app.listen(process.env.PORT, () => {
            console.log(`SERVER ON corriento en el puerto: ${process.env.PORT} - en MODO: CLUSTER- <b>PID WORKER: ${process.pid}</b>`);
        });

        server.on('error', error => { console.log(error)})
    }
}else{
    console.log('debe poner en -m FORK o CLUSTER')
}