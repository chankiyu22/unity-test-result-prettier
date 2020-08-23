const fs = require("fs");

const core = require("@actions/core");
const github = require("@actions/github");

const prettify = require("./src/prettier");
const getFilesRecursively = require("./src/getFilesRecursively");

try {
  const inputPath = core.getInput("path");
  const stat = fs.statSync(inputPath);
  if (stat.isFile()) {
    core.info(prettify(inputPath));
  } else if (stat.isDirectory()) {
    const filePaths = getFilesRecursively(inputPath);
    for (const filePath of filePaths) {
      core.info(prettify(filePath));
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
