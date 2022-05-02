const products = require("../data/products.json");
const {v4: uuidv4} = require("uuid");
const {writeDataToFile} = require("../utils")

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

// @desc Create single product
function create(product) {
    const newProduct = {id: uuidv4(), ...product};
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);

    return new Promise((resolve, reject) => resolve(newProduct));
}



module.exports = {findAll, findById, create};