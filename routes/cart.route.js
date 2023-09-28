const router = require('express').Router();
const bodyParser = require('body-parser');
const cartController = require('../controllers/cart.controller')
const check = require('express-validator').check
const authGuard = require('./guards/auth.guard')
router.route('/')
        .post(authGuard.isAuth,bodyParser.urlencoded({extended:true}),
check('amount').not().isEmpty().withMessage('amount is required').isInt({
    min:1
}).withMessage('amount must be greater than zero'),cartController.postCart)
.get(authGuard.isAuth,cartController.getCart)


router.route('/save').post(authGuard.isAuth,bodyParser.urlencoded({extended:true}),
check('amount').not().isEmpty().withMessage('amount is required').isInt({
    min:1
}).withMessage('amount must be greater than zero'),cartController.postCart)

router.route('/delete').post(authGuard.isAuth,bodyParser.urlencoded({extended:true}),cartController.postDelete)

module.exports = router