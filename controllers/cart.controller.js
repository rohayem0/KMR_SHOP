const cartModel = require('../models/cart.model')
const validationResult = require('express-validator').validationResult;


module.exports.postCart = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        cartModel.addNewItem({
            name:req.body.name,
        price:req.body.price,
        amount:req.body.amount,
        userId:req.session.userId,
        productId:req.body.productId,
        timeStamp:Date.now()
    }).then( _=>res.redirect('/cart')).catch(err =>{
        console.log(err);
    })
    }
    else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}