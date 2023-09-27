const productsModel = require('../models/products.model');
module.exports.getHome = (req,res)=>{
    let category = req.query.category;
    let validCategories = ['all','clothes','phones','computers'];
    if(category && validCategories.includes(category)){
        productsModel.getProductsByCategory(category).then(products=>{
            console.log(`user id is ${req.session.userId }`);
        res.render('index',{
            products:products,
            isUser:req.session.userId,
            validationErrors:req.flash('validationErrors')[0]
        })
    })  
    }
    else if(category && !validCategories.includes(category)){
        console.log(`user id is ${req.session.userId }`);
        res.render('index',{
            products:[],
            isUser:req.session.userId,
            validationErrors:req.flash('validationErrors')[0]
        })
    }  
    else{
        productsModel.getAllProducts().then(products=>{
            console.log(`user id is ${req.session.userId }`);
        res.render('index',{
            products:products,
            isUser:req.session.userId,
            validationErrors:req.flash('validationErrors')[0]
        })
    })
    }
}