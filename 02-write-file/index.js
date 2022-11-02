const fs = require("fs");
const path = require("path");
const { stdout, stdin, stderr } = process;
const EventEmitter = require("events");

const emitter = new EventEmitter();

stdout.write("Hello! Type something!\n");

stdin.on("data", (data) => {
  data.toString().trim() === "exit" && emitter.emit("end");
  if (!path.join(__dirname, "text.txt")) {
    fs.writeFile(path.join(__dirname, "text.txt"), data.toString(), (err) => {
      if (err) throw err;
    });
  } else {
    fs.appendFile(path.join(__dirname, "text.txt"), data.toString(), (err) => {
      if (err) throw err;
    });
  }
});

emitter.on("end", () => {
  stdout.write("Good bye, my friend!");
  process.exit(0);
});

process.on("SIGINT", () => {
  stdout.write("Good bye, my friend!");
  process.exit(0);
});
