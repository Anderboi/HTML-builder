const { constants } = require("buffer");
const {
  readdir,
  createReadStream,
  writeFile,
  createWriteStream,
} = require("fs");
const { mkdir, copyFile } = require("fs/promises");
const path = require("path");

mkdir(path.join(__dirname, "files-copy"), { recursive: true }, (err) => {
  if (err) throw err;
});
const baseFolder = path.join(__dirname, "files");

readdir(baseFolder, (err, files) => {
  err && console.log(err);

  for (const file of files) {
    copyFile(
      path.join(__dirname, "files", file),
      path.join(__dirname, "files-copy", file),
      constants.COPYFILE_FICLONE
    );
  }
});
