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

// @desc Update single product
function update(id, product) {  
    return new Promise((resolve, reject) => {
        const productIndex = products.findIndex(p => p.id === id);
        products[productIndex] = {id, ...product};
        writeDataToFile("./data/products.json", products);
        console.log(products[productIndex]);
        return resolve(products[productIndex]);
    });
}

// @desc Delete single product
function remove(id) {  
    return new Promise((resolve, reject) => {
        const existingProducts = products.filter(p => p.id !== id);
        writeDataToFile("./data/products.json", existingProducts);
        return resolve(existingProducts);
    });
}

module.exports = {findAll, findById, create, update, remove};