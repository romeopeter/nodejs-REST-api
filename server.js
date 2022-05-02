const http = require("http");
const PORT = process.env.PORT || 5000;

const {getProducts, getProduct, createProduct} = require("./controllers/productController");

const server = http.createServer((req, res) => {
    const headerValues = {"Content-Type": "application/json"};

    // Get all products
    if (req.url === "/api/products" && req.method === "GET") {
        getProducts(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
        const productId = Number(req.url.split("/")[3]);
        getProduct(req, res, productId);
    } else if (req.url === "/api/products" && req.method === "POST") {
        createProduct(req, res);
    } else {
        res.writeHead(404, headerValues);
        res.end(JSON.stringify({message: "Route not found"}));
    }
});

server.listen(5000, () => console.log(`Server running on port ${PORT}`));