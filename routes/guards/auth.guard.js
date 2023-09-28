module.exports.isAuth = (req,res,next)=>{
    if(req.session.userId) next();
    else res.redirect('/login');
}
module.exports.notAuth = (req,res,next)=>{
    if(!req.session.userId) next();
    else res.redirect('/');
}
