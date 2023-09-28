const productsModel = require('../models/products.model');
module.exports.getProductById = (req,res)=>{
    let id = req.params.id;
    productsModel.getProductById(id).then(product=>{
        res.render('product',{
            product:product,
            isUser : req.session.userId,
            isAdmin:req.session.isAdmin,
            pageTitle:'product',
        })
    }).catch( _ => res.redirect('/error'))
}
module.exports.getProduct = (req,res)=>{
    productsModel.getFirstProduct().then(product=>{
        res.render('product',{
            product:product,
            isUser : req.session.userId,
            isAdmin:req.session.isAdmin,
            pageTitle:'product',
        })
    }).catch( _ => res.redirect('/error'))
}