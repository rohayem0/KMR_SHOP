const validationResult = require('express-validator').validationResult;
const productModel = require('../models/products.model')
module.exports.getAdd = (req,res)=>{
    res.render('add-product',{
        isUser:true,
        isAdmin:true,
        pageTitle:'add-product',
        validationErrors:req.flash('validationErrors')
    })
}
module.exports.postAdd = (req,res,next)=>{
    console.log(req.file.filename);
    if(validationResult(req).isEmpty()){
        productModel.addProduct({
            name:req.body.name,
            image:req.file.filename,
            price:req.body.price,
            description:req.body.description,
            category:req.body.category
        }).then(_ =>{
            res.redirect('/')
        }).catch(err => {
            next(err)
        })
    }
    else{
        res.render('add-product',{
            validationErrors:validationResult(req).array(),
            isUser:true,
            isAdmin:true,
            pageTitle:'add-product',
        })
    }
}