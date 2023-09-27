const mongoose = require('mongoose');
const bcrypt   = require('bcrypt')
const DB_URL = process.env.DB;
const userSchema = mongoose.Schema({
    userName:String,
    email:String,
    password:String
})

const User = mongoose.model('user',userSchema);
// module.exports.createNewUser =(userName,email,password)=>{
//     return new Promise((resolve,reject)=>{
//         mongoose.connect(DB_URL).then(()=>{
//             return User.findOne({email:email})
//         }).then((user)=>{
//             if(user){
//                 mongoose.disconnect();
//                  reject('email is used')
//             }
//             else {
//                 const salt         = bcrypt.genSaltSync(15);
//                 return bcrypt.hashSync(password,salt)
//             }
//         }).then((hashedPassword)=>{
//             let user = new User({
//                 userName:userName,
//                 email:email,
//                 password:hashedPassword
//             })
//             return user.save()
//         }).then((user)=>{
//             mongoose.disconnect()
//             resolve()
//         }).catch((err)=>{
//                 mongoose.disconnect()
//             reject(err)
//         })
//     })
// }
module.exports.createNewUser =(userName,email,password)=>{
    return new Promise((resolve,reject)=>{
        User.findOne({email:email}).then((user)=>{
            if(user){
                 reject('email is used')
            }
            else {
                const salt         = bcrypt.genSaltSync(15);
                return bcrypt.hashSync(password,salt)
            }
        }).then((hashedPassword)=>{
            let user = new User({
                userName:userName,
                email:email,
                password:hashedPassword
            })
            return user.save()
        }).then((user)=>{
            resolve()
        }).catch((err)=>{
            reject(err)
        })
    })
}
// module.exports.login = (email,password)=>{
//     return new Promise((resolve,reject)=>{
//         mongoose.connect(DB_URL).then(()=>{
//             return User.findOne({email:email})
//         }).then(user =>{
//             if(!user){
//                 mongoose.disconnect()
//                 reject('email not found')
//             }
//             else{
//                 let isPasswordCorrect =  bcrypt.compareSync(password,user.password);
//                 if(!isPasswordCorrect){
//                 mongoose.disconnect()
//                 reject('password is incorrect')
//                 }
//                 else{
//                     mongoose.disconnect()
//                     resolve(user._id)
//                 }
//             }
//         }).catch(err => {
//             mongoose.disconnect()
//             reject(err)
//         })
//     })
// }
module.exports.login = (email,password)=>{
    return new Promise((resolve,reject)=>{
        User.findOne({email:email}).then(user =>{
            if(!user){
                reject('email not found')
            }
            else{
                let isPasswordCorrect =  bcrypt.compareSync(password,user.password);
                if(!isPasswordCorrect){
                reject('password is incorrect')
                }
                else{
                    resolve(user._id)
                }
            }
        }).catch(err => {
            reject(err)
        })
    })
}