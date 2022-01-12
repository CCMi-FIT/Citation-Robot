import * as fs from "fs";
import jsonexport from "jsonexport";
import { makeReport } from "./makeReport";
import { CsvReportLine, getYearsOfReport, PaperReport } from "./model";

const outputFile = "./output/report.csv";

function reportLineToCsvLine(paperReport: PaperReport, years: number[]): CsvReportLine {
  const csvLine =
    {
      year: paperReport.year,
      title: paperReport.title,
      paperId: paperReport.paperId,
    };
  return years.reduce(
    (res, year) => {
      const citationsForYear = paperReport.citations.filter(c => c.year === year);
      if (citationsForYear.length > 1) {
        throw new Error("internal error -- assertion failed");
      }
      return (
        { ...res,
          [year]: citationsForYear.length === 0 ? 0 : citationsForYear[0].numberOfCitations,
        }
      );
    },
    csvLine
  );
}

export async function generateReport(): Promise<void> {
  console.log("Generating report...");
  const report = await makeReport();
  const years = getYearsOfReport(report);
  const csvReport = report.map(line => reportLineToCsvLine(line, years));
  console.log(csvReport);
  const csv = await jsonexport(csvReport);
  console.log("Saving report to " + outputFile + "...");
  fs.writeFileSync(outputFile, csv);
  console.log("Done.");
}