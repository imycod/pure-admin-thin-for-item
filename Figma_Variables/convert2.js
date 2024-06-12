const fs = require("fs");
const path = require("path");

function isEquivalent(a, b) {
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

function convertColorValue(value) {
  const match = value.match(/^{(.+?)}$/);
  if (match) {
    const [, color] = match;
    const parts = color.split(".");
    if (parts.length === 2) {
      const [base, modifier] = parts;
      const baseLower = base.toLowerCase();
      // Handling 100% cases for white and black like '{White.100%}'
      if (
        (baseLower === "white" || baseLower === "black") &&
        modifier === "100%"
      ) {
        return `var(--${baseLower})`;
      }
      // Handle all other Percentages like '{Black.10%}'
      if (modifier.match(/^\d+%$/)) {
        return `var(--${baseLower}-${modifier.replace("%", "")})`;
      }
      // Handle like '{Gray.50}'
      if (modifier.match(/^\d+$/)) {
        return `var(--${baseLower}-${modifier})`;
      }
      // Handle like '{Primary.L-1}'
      if (modifier.match(/^L-\d+$/)) {
        return `var(--unis-${baseLower}-${modifier.replace("L-", "")})`;
      }
    }
  }
  throw new Error(`Invalid color value: ${value}`);
}

//   function processSection(section, prefix = '') {
//     const result = {};
//     for (const [key, value] of Object.entries(section)) {
//         const lowerCaseKey = key.toLowerCase();
//         if( prefix === 'neutral'){
//           console.log('*', prefix, key)
//         }
//         // Prepare the key, omitting 'Surface', 'Text', 'Icon', and 'Stroke' from the prefix
//         const classKey = prefix && !['surface', 'text', 'icon', 'stroke','border'].includes(prefix) ? `${prefix}-${lowerCaseKey}` : lowerCaseKey;
//         //const classKey =  `${prefix}-${lowerCaseKey}`; // For testing
//         if (value.$type === 'color') {
//             result[classKey] = convertColorValue(value.$value);
//         } else {
//             Object.assign(result, processSection(value, classKey));
//         }
//     }
//     return result;
// }

function convert(inputFile, outputFile) {
  fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const inputJson = JSON.parse(data);
    let outputJson = {};

    //Alternitive 2 start
    function generateKeys(data, path = []) {
      let result = {};
      Object.keys(data).forEach(key => {
        const newPath = path.concat(key.toLowerCase());

        if (typeof data[key] === "object" && !data[key].$value) {
          const newResults = generateKeys(data[key], newPath);
          // Check for conflicts before merging
          for (const newKey in newResults) {
            if (result.hasOwnProperty(newKey)) {
              // console.log('same', newKey, newResults[newKey], result[newKey]); // TEST
              if (!isEquivalent(result[newKey], newResults[newKey])) {
                console.error(
                  `Conflict: ${newKey} already exists with a different value`
                );
              }
            }
          }
          // If the current item is an object and doesn't have a $value, go deeper
          result = {
            ...result,
            ...newResults
          };
        } else {
          // Generate the key using the last two segments of the path
          let classKey;
          if (newPath.length === 1) {
            classKey = newPath[0];
          } else {
            classKey = newPath.slice(-2).join("-");
          }
          const val = convertColorValue(data[key].$value);
          result[classKey] = val;
        }
      });
      return result;
    }
    outputJson = generateKeys(inputJson);
    //Alternative 2 end

    // Original 1 Start
    // for (const [key, section] of Object.entries(inputJson)) {
    //   if (key !== 'Surface' && key !== 'Text' && key !== 'Icon') {
    //     Object.assign(outputJson, processSection(section, key.toLowerCase()));
    //   } else {
    //     Object.assign(outputJson, processSection(section));
    //   }
    // }

    // for (const [key, section] of Object.entries(inputJson)) {
    //   const newSection = processSection(section, key.toLowerCase());
    //   for (const [newKey, newValue] of Object.entries(newSection)) {

    //     if (outputJson.hasOwnProperty(newKey)) {
    //       if (!isEquivalent(outputJson[newKey], newValue)) {
    //         console.error(`Conflict: ${newKey} already exists with a different value`);
    //         return;
    //       }
    //     } else {
    //       outputJson[newKey] = newValue;
    //     }
    //   }
    // }
    // Original 1 End

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
  path.resolve("2_split_files/Mode.Light.tokens.json"),
  path.resolve("output2.json")
);
