const path = require("path");
const fs = require("fs");

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
              path.join(__dirname, "project-dist", "template.html"),
              newData
            )
            .catch((err) => {
              if (err) throw err;
            });
        });
    }
  });
});
