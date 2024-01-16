import * as fs from "fs";
import { generateReport } from "./generateReport";

function main(): void {
  const inputFile = "./input/projects.json";
  const contents = fs.readFileSync(inputFile, { encoding: "utf-8" });
  const projects = JSON.parse(contents);
  const reportsPms = projects.map(generateReport);
  Promise.all(reportsPms);
}

main();