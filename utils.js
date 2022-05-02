const fs = require("fs");
const { Module } = require("module");

function writeDataToFile(fileName, content) {
    fs.writeFileSync(fileName, JSON.stringify(content), "utf8", (err) => {
        if (err) console.log(err);
    });
}

module.exports = {writeDataToFile};