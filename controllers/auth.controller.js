const authModel = require('../models/auth.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const validationResult = require('express-validator').validationResult
module.exports.getSignup = (req,res)=>{
    res.render('signup',{
        authError:req.flash('authError')[0],
        validationErrors:req.flash('validationErrors'),
        isUser:false,
        isAdmin:false,
        pageTitle:'signup',
    })

}
module.exports.postSignup =async (req,res)=>{
    //return console.log(validationResult(req));
    if(validationResult(req).isEmpty){
        authModel.createNewUser(req.body.userName,req.body.email,req.body.password).then(()=>res.redirect('/login')).catch(err => {
        res.redirect('/error')
        })
    }
    
    else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/signup')
    }
}
module.exports.getLogin = (req,res)=>{
    console.log(req.flash('authError'));
    res.render('login',{
        authError:req.flash('authError')[0],
        validationErrors:req.flash('validationErrors'),
        isUser : false,
        isAdmin:false,
        pageTitle:'login',
    })
}
module.exports.postLogin = (req,res)=>{
    if(validationResult(req).isEmpty()){
            authModel
        .login(req.body.email,req.body.password)
        .then((user)=> {
            console.log(`user id is ${user._id}`);
            console.log(`is admin ${user.isAdmin}`);
            req.session.userId = user._id,
            req.session.isAdmin = user.isAdmin
            res.redirect('/')
        })
        .catch(err=>{
            res.redirect('/error')
        })
    }
    else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/login')
    }
}
module.exports.logout = async(req,res)=>{
    await req.session.destroy(()=>{
        res.redirect('/')
    })
}