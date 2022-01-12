import _ from "lodash";
import * as fs from "fs";
import type { Paper, PaperWithCitations, PaperReport, Report, CitationReport } from "./model";
import { getPaper, getPaperWithCitations } from "./api";

const inputFile = "./input/papers.json";

function isSelfCited(citedPaper: Paper, paper: Paper): boolean {
  const cpAuthorsIds = citedPaper.authors.map(a => a.authorId);
  const authorsIds = paper.authors.map(a => a.authorId);
  return _.intersection(authorsIds, cpAuthorsIds).length > 0 ? true : false;
}

async function getCitingPapers(citedPaper: PaperWithCitations): Promise<Paper[]> {
  const citingPapersIds = citedPaper.citations.map(citation => citation.paperId);
  const getPapersPms = citingPapersIds.map(getPaper);
  return Promise.all(getPapersPms);
}

function getNumberOfCitationsForYear(citingPapers: Paper[], year: number): number {
  return citingPapers.filter(p => p.year === year).length;
}

async function makeReportForPaperId(citedPaperId: string): Promise<PaperReport> {
  console.log("Retrieving paper " + citedPaperId + "...");
  const citedPaper = await getPaperWithCitations(citedPaperId);
  console.log(`Making report for '${citedPaper.title}' [${citedPaperId}]...`);
  const citingPapers = await getCitingPapers(citedPaper);
  const cleanCitingPapers = citingPapers.filter(p => !isSelfCited(citedPaper, p));
  const years: number[] = _.sortedUniq(cleanCitingPapers.map(p => p.year).sort());
  const citations: CitationReport[] = years.map(
    year => (
      {
        year,
        numberOfCitations: getNumberOfCitationsForYear(cleanCitingPapers, year),
       }
    )
  );
  const report: PaperReport = {
    paperId: citedPaper.paperId,
    title: citedPaper.title,
    year: citedPaper.year,
    citations,
  }
  ;
  return report;
}

async function makePaperReports(papersIds: string[]): Promise<PaperReport[]> {
  const paperReportsPms = papersIds.map(makeReportForPaperId);
  return Promise.all(paperReportsPms);
}

export async function makeReport(): Promise<Report> {
  console.log("Making report...");
  const contents = fs.readFileSync(inputFile, { encoding: "utf-8" });
  const papersIds: string[] = JSON.parse(contents);
  const papersReports = await makePaperReports(papersIds);
  return _.sortBy(papersReports, paperReport => paperReport.year);
}
