const fs = require("fs");

const readStream = fs.createReadStream("./streams.txt", { encoding: "utf8" });
const writeStream = fs.createWriteStream("./streams3.txt");

// readStream.on("data", (chunk) => {
//   console.log("---- NEW CHUNK ----");
//   console.log(chunk);
//   writeStream.write("\n\n\n New Chunk \n\n\n");
//   writeStream.write(chunk);
// });

// piping
// echivalent cu ce e mai sus
readStream.pipe(writeStream);
