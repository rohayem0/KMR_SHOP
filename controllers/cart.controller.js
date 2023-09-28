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
        res.redirect('/error')
    })
    }
    else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}
module.exports.getCart =(req,res,next)=>{ 
    cartModel.getItemsByUser(req.session.userId).then(items =>{
        console.log(items);
        res.render('cart',{
            items:items,
            isUser:true,
            isAdmin:req.session.isAdmin,
            pageTitle:'cart',
        })
    }).catch(err => res.redirect('/error'))
}
module.exports.postSave =(req,res,next)=>{
    if(validationResult(req).isEmpty()){
        cartModel.editItem(req.body.cartId,{
        name:req.body.name,
        price:req.body.price,
        amount:req.body.amount,
        userId:req.session.userId,
        
        timeStamp:Date.now()
    }).then( _=>res.redirect('/cart')).catch(err =>{
        res.redirect('/error')
    })
    }
    else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/cart')
    }
}
module.exports.postDelete = (req,res,next)=>{
    cartModel.deleteItem(req.body.cartId).then(data =>{
        console.log(data);
        res.redirect('/cart')
    }).catch(err =>{
        res.redirect('/error')
    })
}

