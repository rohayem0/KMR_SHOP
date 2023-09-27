const authModel = require('../models/auth.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const validationResult = require('express-validator').validationResult
module.exports.getSignup = (req,res)=>{
    res.render('signup',{
        authError:req.flash('authError')[0],
        validationErrors:req.flash('validationErrors'),
        isUser:false
    })

}
module.exports.postSignup =async (req,res)=>{
    //return console.log(validationResult(req));
    if(validationResult(req).isEmpty){
        authModel.createNewUser(req.body.userName,req.body.email,req.body.password).then(()=>res.redirect('/login')).catch(err => {
        console.log(err);
        res.redirect('/signup')
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
        isUser : false
    })
}
module.exports.postLogin = (req,res)=>{
    if(validationResult(req).isEmpty()){
            authModel
        .login(req.body.email,req.body.password)
        .then((id)=> {
            console.log(`user id is ${id}`);
            req.session.userId = id
            res.redirect('/')
        })
        .catch(err=>{
            req.flash('authError',err)
            res.redirect('/login')
        })
    }
    else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/login')
    }
}
module.exports.logout = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}