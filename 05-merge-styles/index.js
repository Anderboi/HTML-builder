const fs = require("fs");
const { createReadStream, createWriteStream } = require("fs");
const path = require("path");

const output = createWriteStream(path.join(__dirname, "bundle.css"));
fs.readdir(
  path.join(__dirname, "styles"),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;

    for (const file of files) {
      //*check if *file* is not a folder and is css-file
      if (!file.isDirectory() && path.parse(file.name).ext === ".css") {
        const readableStream = createReadStream(
          path.join(__dirname, "styles", file.name)
        );
        let data = "";
        readableStream.on("data", (chunk) => {
          output.write((data += `${chunk.toString()}\n`));
        });
      }
    }
  }
);
