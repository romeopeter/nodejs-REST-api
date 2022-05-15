const http = require("http");
const PORT = process.env.PORT || 5000;

const { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct
} = require("./controllers/productController");

const server = http.createServer((req, res) => {
    const headerValues = { "Content-Type": "application/json" };
    const requestMethods = {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE"
    };
    
    // Incorrect method and route
    if (req.method !== requestMethods[req.method] || req.url !== "/api/products") {
        res.writeHead(404, headerValues);
        res.end(JSON.stringify({ message: "Route not found" }));
    }

    // Get all products
    if (req.url === "/api/products" && req.method === "GET") {
        getProducts(req, res);
    }

    // Get single product
    if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
        const productId = Number(req.url.split("/")[3]);
        getProduct(req, res, productId);
    }
    
    // Create product
    if (req.url === "/api/products" && req.method === "POST") {
        createProduct(req, res);
    }
    
    // Update product
    if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PUT") {
        const productId = Number(req.url.split("/")[3]);
        updateProduct(req, res, productId);
    } 
    
    // Delete product
    if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "DELETE") {
        const productId = Number(req.url.split("/")[3]);
        deleteProduct(req, res, productId);
    }
});

server.listen(5000, () => console.log(`Server running on port ${PORT}`));