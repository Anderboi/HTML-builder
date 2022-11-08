const path = require("path");
const fs = require("fs");
const { constants } = require("buffer");

const baseHTML = path.join(__dirname, "template.html");

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.promises.readFile(baseHTML, "utf-8").then((data) => {
  let newData = data;

  fs.promises.readdir(path.join(__dirname, "components")).then((files) => {
    for (const file of files) {
      const fileName = path.parse(file).name;
      fs.promises
        .readFile(path.join(__dirname, "components", file), "utf-8")
        .then((tagData) => {
          newData = newData.replace(`{{${fileName}}}`, tagData);

          fs.promises
            .writeFile(
              path.join(__dirname, "project-dist", "index.html"),
              newData
            )
            .catch((err) => {
              if (err) throw err;
            });
        });
    }
  });
});

const output = fs.createWriteStream(
  path.join(__dirname, "project-dist", "style.css")
);
fs.readdir(
  path.join(__dirname, "styles"),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;

    for (const file of files) {
      //*check if *file* is not a folder and is css-file
      if (!file.isDirectory() && path.parse(file.name).ext === ".css") {
        const readableStream = fs.createReadStream(
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

function copyDir(folderPath, distPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (path.parse(file).ext) {
        fs.copyFile(
          path.join(folderPath, file),
          path.join(distPath, file),
          constants.COPYFILE_FICLONE,
          (err) => {
            if (err) throw err.message;
          }
        );
      } else {
        fs.promises
          .mkdir(path.join(distPath, file), { recursive: true })
          .then(() => {
            copyDir(path.join(folderPath, file), path.join(distPath, file));
          });
      }
    }
  });
}
copyDir(
  path.join(__dirname, "assets"),
  path.join(__dirname, "project-dist", "assets")
);
