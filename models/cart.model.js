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
            resolve(item.save())
        } catch (error) {
            reject(error)
        }
    })
}
module.exports.getItemsByUser = userId =>{
    return new Promise((resolve,reject)=>{
        try {
            resolve(CartItem.find({userId:userId},{},{sort:{timeStamp:1}}))
        } catch (error) {
            reject(error)
        }
    })
}
module.exports.editItem = (id,data)=>{
    return new Promise((resolve,reject)=>{
        try {
            
            resolve(CartItem.fin)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports.deleteItem = id =>{
    return new Promise((resolve,reject)=>{
        try {
            resolve(CartItem.deleteOne({_id:id}))
            
            
        } catch (error) {
            reject(error)
        }
    })
}