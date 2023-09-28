const mongoose = require('mongoose');
const DB_URL   = process.env.DB;
const productSchema = mongoose.Schema({
    name:String,
    image:String,
    price:Number,
    description:String,
    category:String
});

// const Product = mongoose.model('product',productSchema);
// module.exports.getAllProducts = ()=>{
//     return new Promise((resolve,reject)=>{
//         mongoose.connect(DB_URL).then(()=>{
//         return Product.find({})
//     }).then(products =>{
//             mongoose.disconnect();
//             resolve(products);
//         }).catch(err =>{
//             mongoose.disconnect()
//             reject(err)
//         });
//     });
    
// }
const Product = mongoose.model('product',productSchema);
module.exports.getAllProducts = ()=>{
    return new Promise((resolve,reject)=>{
        Product.find({}).then(products =>{
            resolve(products);
        }).catch(err =>{
            reject(err)
        });
    });
    
}
// module.exports.getProductsByCategory = (category)=>{
//     return new Promise((resolve,reject)=>{
//         mongoose.connect(DB_URL).then(()=>{
//         return Product.find({category})
//     }).then(products =>{
//             mongoose.disconnect();
//             resolve(products);
//         }).catch(err => {
//             mongoose.disconnect()
//             reject(err)
//         });
//     });
    
// }
module.exports.getProductsByCategory = (category)=>{
    return new Promise((resolve,reject)=>{
        Product.find({category}).then(products =>{
            resolve(products);
        }).catch(err => {
            reject(err)
        });
    });
    
}
// module.exports.getProductById = id =>{
//     return new Promise((resolve,reject)=>{
//         mongoose.connect(DB_URL).then(()=>{

//         return Product.findById(id)
//     }).then(product =>{
//             mongoose.disconnect();
//             resolve(product);
//         }).catch(err => {
//             mongoose.disconnect()
//             reject(err)
//         });
//     });
// }
module.exports.getProductById = id =>{
    return new Promise((resolve,reject)=>{
        Product.findById(id).then(product =>{
            resolve(product);
        }).catch(err => {
            reject(err)
        });
    });
}
module.exports.getFirstProduct = _ =>{
    return new Promise((resolve,reject)=>{
        Product.findOne().then(product =>{
            resolve(product);
        }).catch(err => {
            reject(err)
        });
    });
}

module.exports.addProduct = data => 
    
    new Promise((resolve,reject)=>{
        //return reject('error')
        try {
            resolve(Product.create(data))
        } catch (error) {
            reject(error)
        }
    })