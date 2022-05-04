const { rejects } = require("assert");
const fs = require("fs");
const { Module } = require("module");

function writeDataToFile(fileName, content) {
    fs.writeFileSync(fileName, JSON.stringify(content), "utf8", (err) => {
        if (err) console.log(err);
    });
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", chunk => body += chunk.toString());
            req.on("end", () => resolve(JSON.parse(body)))
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {writeDataToFile, getPostData};