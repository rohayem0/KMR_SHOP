const router = require('express').Router();
const multer = require('multer')
const check = require('express-validator').check
const adminGuard = require('./guards/admin.guard');
const adminController = require('../controllers/admin.controller')

router.route('/add').post(adminGuard.isAdmin,multer({
    //dest:'images'
    storage:multer.diskStorage({
        destination :(req,file,callback)=>{
            callback(null,'images')
        },
        filename :(req,file,callback)=>{
            callback(null,Date.now()+'-'+file.originalname)
        }
    })
}).single('image'),check('image').custom((value,{req})=>{
    if(req.file) return true;
    else throw 'image is required'
}),adminController.postAdd).get(adminGuard.isAdmin,adminController.getAdd)

module.exports = router 