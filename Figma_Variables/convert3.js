const fs = require("fs");
const path = require("path");

// Read the input JSON file
const inputJson = require("./output1.json");

// Initialize an empty object for the Tailwind CSS configuration
const colors = {
  darkMode: {},
  lightMode: {}
};

// Define a mapping of light-to-dark mode color suffixes
const modeSuffixMapping = {
  50: "900",
  100: "800",
  200: "700",
  300: "600",
  400: "500",
  500: "400",
  600: "300",
  700: "200",
  800: "100",
  900: "50"
};

// Iterate through the input JSON data and generate the Tailwind CSS configuration
for (const key in inputJson) {
  const colorShades = inputJson[key];
  for (const shadeKey in colorShades) {
    const lightColor = colorShades[shadeKey];

    // Determine the corresponding dark mode suffix
    const darkModeSuffix = modeSuffixMapping[shadeKey];

    // Get the dark color based on the suffix
    const blackWhite = {
      black: "white",
      white: "black"
    };

    const darkColor = blackWhite[key]
      ? inputJson[blackWhite[key]][shadeKey]
      : colorShades[darkModeSuffix];

    if (darkColor === undefined) {
      console.log("undefined:", key);
    }

    // Define the CSS variables for light and dark modes
    const lightCssVar = lightColor;
    const darkCssVar = darkColor;

    // Define the CSS class name
    function generateString(key, shadeKey) {
      if (
        (key == "white" && shadeKey == "100") ||
        (key == "black" && shadeKey == "100")
      ) {
        return `--${key}`;
      }
      return `--${key}-${shadeKey}`;
    }
    const cssVar = generateString(key, shadeKey);

    // Add the CSS classes to the Tailwind CSS configuration
    colors.lightMode[cssVar] = lightCssVar;
    colors.darkMode[cssVar] = darkCssVar;
  }
}

// Write the Tailwind CSS configuration to an output file (output3.js)
fs.writeFileSync("output3.json", JSON.stringify(colors, null, 2), "utf-8");

const outputFile = path.resolve("output3.json");
fs.writeFile(outputFile, JSON.stringify(colors, null, 2), "utf8", err => {
  if (err) {
    console.error("Error writing the file:", err);
  } else {
    console.log("File written successfully:", outputFile);
  }
});
