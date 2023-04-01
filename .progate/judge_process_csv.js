import process from "process";
import { strict as assert } from "node:assert";
import ANSWER from "../answer_process_csv.js";

if (!ANSWER) {
  console.log("Missing default export in answer_find.js.");
  process.exit(1);
}

const results = [];
results.push(assert(ANSWER.columnNames[0] === "団体コード", "columnNames[0] is incorrect"));
results.push(assert(ANSWER.columnNames[1] === "団体名", "columnNames[1] is incorrect"));
results.push(assert(ANSWER.columnNames[2] === "更新日", "columnNames[2] is incorrect"));
results.push(assert(ANSWER.columnNames.length === 3, "columnNames has too many elements"));

results.push(assert(ANSWER.latestDate === "2023/3/1", "latestDate is incorrect"));
const latestDistricts = new Set(ANSWER.latestDistricts);
results.push(assert(latestDistricts.has("長野県茅野市") && latestDistricts.has("沖縄県うるま市"), "missing elements in latestDistricts"));
results.push(assert(latestDistricts.size === 2, "latestDistricts has too many elements"));

results.push(assert(ANSWER.largestChange.date === "2022/1/12", "largestChange.date is incorrect"));
results.push(assert(ANSWER.largestChange.count === 27, "largestChange.count is incorrect"));

// Filter empty results out.
const errors = results.filter((msg) => !!msg);
if (errors.length > 0) {
  console.log(errors.join("\n"));
  process.exit(1);
}

console.log("Correct. Congratulations!");
