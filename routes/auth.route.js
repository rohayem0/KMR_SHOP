const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;
const authController = require('../controllers/auth.controller')
const authGuard = require('./guards/auth.guard')
//you can use this middleware to confirm password
//(req,res,next)=>{
    //     let value = req.body.password;
    //     return check('confirmPassword').equals(value)
    // }
router.route('/signup')
    .get(authGuard.notAuth,authController.getSignup)
    .post(authGuard.notAuth,bodyParser.urlencoded({extended:true}),
    check('userName').not().isEmpty(),
    check('email').not().isEmpty().withMessage('email is required').isEmail(),
    check('password').isLength({
        min:6
    }),
    
    check('confirmPassword').custom((value,meta)=>{
        if(meta.req.body.password === value) return true
        throw 'password doesnt confirm'
    }),authController.postSignup);
router.route('/login')
        .get(authGuard.notAuth,authController.getLogin)
        .post(authGuard.notAuth,bodyParser.urlencoded({extended:true}),authController.postLogin);
router.route('/logout').all(authGuard.isAuth,authController.logout)
module.exports = router;