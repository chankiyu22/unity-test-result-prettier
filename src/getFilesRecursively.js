const { statSync, readdirSync } = require("fs");
const { join } = require("path");

const isDirectory = (path) => statSync(path).isDirectory();
const getDirectories = (path) =>
  readdirSync(path)
    .map((name) => join(path, name))
    .filter(isDirectory);

const isFile = (path) => statSync(path).isFile();
const getFiles = (path) =>
  readdirSync(path)
    .map((name) => join(path, name))
    .filter(isFile);

const getFilesRecursively = (path) => {
  let dirs = getDirectories(path);
  let files = dirs
    .map((dir) => getFilesRecursively(dir)) // go through each directory
    .reduce((a, b) => a.concat(b), []); // map returns a 2d array (array of file arrays) so flatten
  return files.concat(getFiles(path));
};

module.exports = getFilesRecursively;
