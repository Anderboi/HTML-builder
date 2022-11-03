const path = require("path");
const fs = require("fs");
const { stdout } = require("process");

const folderName = path.join(__dirname, "secret-folder");

fs.readdir(folderName, { withFileTypes: true }, (err, files) => {
  err && console.log(err.message);

  for (const file of files) {
    if (!file.isDirectory()) {

      const {name, ext} = path.parse(file.name)
      fs.stat(path.join(__dirname, 'secret-folder', file.name), (err,stats)=> {
        err && console.log(err.message);

        const {size} = stats;
        
        stdout.write(`${name} - ${ext.replace('.','')} - ${(size/1024).toFixed(2)}kb\n`);
      })
    }
  }
});
