const fs = require("fs");
// reading files
fs.readFile("./files/yes.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});

console.log("last time");

// writing files

fs.writeFile("./files/yes.txt", "helloworld", () => {
  console.log("file was written");
});

// directories
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder deleted");
  });
}

// deleting files

if (fs.existsSync("./files/delete.txt")) {
  fs.unlink("./files/delete.txt", (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log("file deleted");
} else {
  fs.writeFile("./files/delete.txt", "yes, delete me ><", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("created file delete.txt");
  });
}
