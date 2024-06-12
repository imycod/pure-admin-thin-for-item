const fs = require("fs");
const path = require("path");

function convert(inputFile, outputFile) {
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const inputJson = JSON.parse(data);
    const outputJson = {};

    for (const color in inputJson) {
      outputJson[color.toLowerCase()] = {};
      for (const shade in inputJson[color]) {
        const newShade = shade.replace("%", ""); // remove '%' symbol
        outputJson[color.toLowerCase()][newShade] =
          inputJson[color][shade]["$value"];
      }
    }

    fs.writeFile(
      outputFile,
      JSON.stringify(outputJson, null, 2),
      "utf8",
      err => {
        if (err) {
          console.error("Error writing the file:", err);
        } else {
          console.log("File written successfully:", outputFile);
        }
      }
    );
  });
}

convert(
  path.resolve("2_split_files/_Core Colors.value.tokens.json"),
  path.resolve("output1.json")
);
