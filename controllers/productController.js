const Product = require("../models/productModels");
const headerValues = { "Content-Type": "application/json" };
const { getPostData } = require("../utils");

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

        if (product === undefined) {
            res.writeHead(404, headerValues);
            res.end(JSON.stringify({ statusCode: 404, message: "Product Not Found" }));
        } else {
            res.writeHead(200, headerValues);
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc  Create single product
// @Route POST api/products
async function createProduct(req, res) {
    const postData = await getPostData(req);
    const { name, description, price } = postData;

    const newProduct = await Product.create({ name, description, price });

    res.writeHead(201, headerValues);
    res.end(JSON.stringify(newProduct));
}

// @desc Update single product
// @Route PUT api/products/:id -->[0-9]
async function updateProduct(req, res, productId) {

    try {
        const product = await Product.findById(productId);

        if (product === undefined) {
            res.writeHead(404, headerValues);
            res.end(JSON.stringify({ statusCode: 404, message: "Product Not Found" }));
        } else {
            const body = await getPostData(req);

            const {name, description, price} = body;

            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }

            const updatedProduct = await Product.update(productId, productData);

            res.writeHead(200, headerValues);
            res.end(JSON.stringify(updatedProduct));
        }
    } catch (error) {
        console.log(error)
    }
}

async function deleteProduct(req, res, productId) {
    try {
        const product = await Product.findById(productId);

        if (product === undefined) {
            res.writeHead(404, headerValues);
            res.end(JSON.stringify({ statusCode: 404, message: "Product Not Found" }));
        } else {
            const products = await Product.remove(productId);

            res.writeHead(200, headerValues);
            res.end(JSON.stringify(products));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
};