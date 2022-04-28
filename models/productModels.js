const products = require("../data/products.json");

// @desc Get all products
function findAll() {
    return new Promise((resolve, reject) => {
        return resolve(products);
    })
}

// @desc Get single product
function findById(id) {
   return new Promise((resolve, reject) => {
        const product = products.find(product => product.id === id);
        return resolve(product);
   });
}



module.exports = {findAll, findById};