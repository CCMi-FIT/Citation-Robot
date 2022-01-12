import _ from "lodash";

export type Author = {
  authorId: string;
  name: string;
};

export type Citation = {
  paperId: string;
  title: string;
};

export type Paper = {
  paperId: string;
  title: string;
  authors: Author[];
  year: number;
  citations: Citation[];
};

export type PaperWithCitations = Paper & {
  citations: Citation[];
};

export type CitationReport = {
  year: number;
  numberOfCitations: number;
};

export type PaperReport = {
  paperId: string;
  title: string;
  year: number;
  citations: CitationReport[];
};


export type Report = PaperReport[];

export function getYearsOfReport(report: Report): number[] {
  return _.sortedUniq(report.reduce(
    (res: number[], paperReport: PaperReport) => [...res, ...paperReport.citations.map(c => c.year)],
    []
  ).sort());
}

// CSV

export type CsvReportLine = {
  year: number;
  title: string;
  paperId: string;
  [citationYear: number]: number;
}