const path = require("path");
const fs = require("fs");
const { constants } = require("buffer");

// create destination folder
fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
});

// make copy of HTML file in destination folder
fs.copyFile(
  path.join(__dirname, "template.html"),
  path.join(__dirname, "project-dist", "template.html"),
  constants.COPYFILE_FICLONE,
  (err) => {
    if (err) throw err;
  }
);

const changeTag = (basePath, compts, str) => {
  //get files from components folder
  fs.readdir(compts, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      //get path of current file in components folder
      const filePath = path.join(compts, file);

      if (path.parse(file).name === str) {
        fs.readFile(filePath, "utf-8", (err, fileData) => {
          if (err) throw err;
          // let chunkData = "";
          const output = fs.createWriteStream(basePath);
          const readableStream = fs.createReadStream(basePath, 'utf-8');
          readableStream.on("data", (chunk) => {
            // chunkData += chunk;
            console.log(chunk);
            // chunkData.replace(`{{${str}}}`, "fileData");
            output.write(chunk.replace(`{{${str}}}`, "fileData"));
          });

          fs.readFile(basePath, "utf-8", (err, data) => {
            if (err) throw err;

            data.replace("wildlife", "fileData");
          });
        });
      }
    }
  });
};

changeTag(
  path.join(__dirname, "project-dist", "template.html"),
  path.join(__dirname, "components"),
  "header"
);
// changeTag(path.join(__dirname, 'template.html'),path.join(__dirname, 'components'), 'footer');
