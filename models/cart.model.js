const mongoose = require('mongoose')
const cartSchema = mongoose.Schema({
    name:String,
    price:Number,
    amount:Number,
    userId:String,
    productId:String,
    timeStamp:Number
});
const CartItem = mongoose.model('Cart',cartSchema);

module.exports.addNewItem = data =>{
    return new Promise((resolve,reject)=>{
        let item = new CartItem(data);
        try {
            item.save();
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
