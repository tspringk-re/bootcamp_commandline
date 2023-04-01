import process from "process";
import { strict as assert } from "node:assert";
import ANSWER from "../answer_find.js";

if (!ANSWER) {
  console.log("Missing default export in answer_find.js.");
  process.exit(1);
}

const results = [];
results.push(assert(ANSWER.largestFilename === "files_to_search/dir3/file7.txt", "largestFilename is not correct."));
results.push(assert(ANSWER.largestFileLines === 89, "largestFileLines is not correct."));

// Filter empty results out.
const errors = results.filter((msg) => !!msg);
if (errors.length > 0) {
  console.log(errors.join("\n"));
  process.exit(1);
}

console.log("Correct. Congratulations!");
