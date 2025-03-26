import * as fs from "fs";
import { generateReport } from "./generateReport";

function wait(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

async function main(): Promise<void> {
  const inputFile = "./input/projects.json";
  const contents = fs.readFileSync(inputFile, { encoding: "utf-8" });
  const projects = JSON.parse(contents);
  // const reportsPms = projects.map(generateReport);
  for (const project of projects) {
    await generateReport(project);
    await wait();
  }
  // Promise.all(reportsPms);
}

main();