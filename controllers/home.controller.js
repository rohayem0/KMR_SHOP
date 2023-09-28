const productsModel = require('../models/products.model');
module.exports.getHome = (req,res)=>{
    let category = req.query.category;
    let validCategories = ['all','clothes','phones','computers'];
    if(category && validCategories.includes(category)){
        productsModel.getProductsByCategory(category).then(products=>{
        res.render('index',{
            products:products,
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            pageTitle:'home',
            validationError:req.flash('validationErrors')[0]
        })
    }).catch( _=> res.redirect('/error'))  
    }
    else if(category && !validCategories.includes(category)){
        console.log(`user id is ${req.session.userId }`);
        res.render('index',{
            products:[],
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            pageTitle:'home',
            validationError:req.flash('validationErrors')[0]
        })
    }  
    else{
        productsModel.getAllProducts().then(products=>{
            console.log(`user id is ${req.session.userId }`);
        res.render('index',{
            products:products,
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin,
            pageTitle:'home',
            validationError:req.flash('validationErrors')[0]
        })
    })
    }
}