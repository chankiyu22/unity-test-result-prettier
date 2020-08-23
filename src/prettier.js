const fs = require("fs");
const path = require("path");

const parser = require("fast-xml-parser");

const PASSED_ICON = "\u2713";
const FAILED_ICON = "\u2717";

const PASSED_COLOR = "\x1b[32m";
const FAILED_COLOR = "\x1b[31m";
const SKIPPED_COLOR = "\x1b[33m";
const RESET_COLOR = "\x1b[0m";

function getResultIcon(result) {
  if (result.indexOf("Passed") > -1) {
    return `${PASSED_COLOR}${PASSED_ICON}${RESET_COLOR}`;
  }
  if (result.indexOf("Failed") > -1) {
    return `${FAILED_COLOR}${FAILED_ICON}${RESET_COLOR}`;
  }
  return "";
}

function prettify(filepath) {
  const stat = fs.statSync(filepath);
  if (!stat.isFile()) {
    throw new Error(`${filepath} is not a file`);
  }

  const filename = path.basename(filepath);

  let res = "";

  const data = fs.readFileSync(filepath, "utf8");
  const options = {
    attributeNamePrefix: "",
    ignoreAttributes: false,
    arrayMode: true,
  };

  let jsonObj;
  try {
    jsonObj = parser.parse(data, options, true);
  } catch {
    return "";
  }

  const testRuns = jsonObj["test-run"];
  if (testRuns && testRuns.length > 0) {
    testRuns.forEach((testRun) => {
      res += printTestRun(filename, testRun);
      const testSuites = testRun["test-suite"];
      if (testSuites && testSuites.length > 0) {
        testSuites.forEach((testSuite) => {
          res += printTestSuite(testSuite, 1);
        });
      }
    });
  }

  return res;
}

function printTestRun(filename, testRun) {
  const { result, passed, failed, skipped, total } = testRun;
  return (
    `${getResultIcon(result)} Test Run (${filename}): ${result} ${printStat(
      passed,
      failed,
      skipped,
      total
    )}` + "\n"
  );
}

function printTestSuite(testSuite, indentLevel) {
  let res = "";

  const { result, name, passed, failed, skipped, total } = testSuite;
  let indent = "";
  for (let i = 0; i < indentLevel; i++) {
    indent += "  ";
  }
  res +=
    `${indent}${getResultIcon(result)} ${name}: ${result} ${printStat(
      passed,
      failed,
      skipped,
      total
    )}` + "\n";

  const testSuites = testSuite["test-suite"];
  if (testSuites && testSuites.length > 0) {
    testSuites.forEach((testSuite) => {
      res += printTestSuite(testSuite, indentLevel + 1);
    });
  }

  const testCases = testSuite["test-case"];
  if (testCases && testCases.length > 0) {
    testCases.forEach((testCase) => {
      res += printTestCase(testCase, indentLevel + 1);
    });
  }

  return res;
}

function printTestCase(testCase, indentLevel) {
  const { result, name } = testCase;

  let indent = "";
  for (let i = 0; i < indentLevel; i++) {
    indent += "  ";
  }

  return `${indent}${getResultIcon(result)} ${name}: ${result}` + "\n";
}

function printStat(passed, failed, skipped, total) {
  return `(${PASSED_COLOR}${passed}${RESET_COLOR} + ${FAILED_COLOR}${failed}${RESET_COLOR} + ${SKIPPED_COLOR}${skipped}${RESET_COLOR})/${total}`;
}

module.exports = prettify;
