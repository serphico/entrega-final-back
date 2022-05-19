const logger = require('../utils/logger')
class Cart{
    constructor(){
        this.contentCart = []
    }
    

    addProd(products){
        try {
            
            if(this.contentCart.length <= 0){
                let newProd = {...products, quantity : 1}
                this.contentCart.push(newProd)
            }else if(this.contentCart.length >= 1){
                this.contentCart.forEach((prod, index) => {
                     console.log(`${prod.idProduct}`)
                    if(prod.idProduct === products.idProduct){
                        prod.quantity++
                    }
                    
                });
            }
         
        } catch (error) {
          logger.info(`error on class Cart en el metodo addProd: ${error}`)  
        }
    }


    async showCart(){
        try {
            let cartContent = await this.contentCart;
            console.log(cartContent)
            return cartContent;

        } catch (error) {
            logger.info(`error on class Cart en el metodo showCart: ${error}`)  

        }
    }

}

const cartHandler = new Cart()

module.exports = cartHandler;