const Product = require("../models/productModels");
const headerValues = {"Content-Type": "application/json"};

// @desc Get all products
// @Route GET api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.writeHead(200, headerValues);
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error)
    }
}

// @desc Gets single product
// @Route GET api/products/:id -->[0-9]
async function getProduct(req, res, productId) {
    try {
        const product = await Product.findById(productId);

        if (product ===  undefined) {
            res.writeHead(404, headerValues);
            res.end(JSON.stringify({statusCode: 404, message: "Product Not Found"}));
        } else {
            res.writeHead(200, headerValues);
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getProducts, getProduct};