const express = require('express');
const dotenv = require('dotenv')
const path = require('path');
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const mongoose = require('mongoose');

dotenv.config({
    path:'./.env'
})
mongoose.connect(process.env.DB).then(()=>{
    console.log('database connected');
})
const app = express();
const homeRouter = require('./routes/home.route');
const productRouter = require('./routes/product.route');
const authRouter = require('./routes/auth.route');
const cartRouter = require('./routes/cart.route');
const adminRouter = require('./routes/admin.route')
app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))

const STORE =new SessionStore({
    uri:process.env.DB,
    collection:'sessions'
})

app.use(session({
    secret:'this is my secret to hash ',
    saveUninitialized:false,
    
    cookie:{
        // maxAge:1*60*60*100
    },
    store:STORE,
    resave:true
}))
app.use(flash());
app.set('view engine','ejs');
app.set('views','views');
app.use('/',homeRouter);
app.use('/',authRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/admin',adminRouter);
// app.use('/error',(req,res,next)=>{
//     res.render('error',{
//                 isUser:req.session.userId,
//                 isAdmin:req.session.isAdmin
//             })
// })
app.get('/error',(req,res)=>{
    res.status(500)
    res.render('error',{
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin
        })
})
app.get('/not-admin',(req,res)=>{
    res.status(403)
    res.render('not-admin',{
            isUser:req.session.userId,
            isAdmin:req.session.isAdmin
        })
})
app.use((error,req,res,next)=>{
    res.redirect('/error')
})
app.listen(3000,()=>{
    console.log('server is running...');
})