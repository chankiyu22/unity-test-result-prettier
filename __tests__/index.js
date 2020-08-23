const prettify = require("../src/prettier");
const getFilesRecursively = require("../src/getFilesRecursively");

console.debug(prettify("./fixtures/example.xml"));

const filePaths = getFilesRecursively("./fixtures");

console.debug(filePaths);

for (const filePath of filePaths) {
  console.debug(prettify(filePath));
}
