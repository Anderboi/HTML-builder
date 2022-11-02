const path = require("path");
const fs = require("fs");
const { stdout } = require("process");

const filePath = path.join(__dirname, "text.txt");

const readStream = fs.createReadStream(filePath, "utf-8");

let data = "";

readStream.on("data", (chunk) => {
  stdout.write((data += chunk));
});

readStream.on("error", (error) => stdout.write("Error", error.message));
