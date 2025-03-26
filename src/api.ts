import got from "got";
import type { Paper, PaperWithCitations } from "./model";

/*export async function searchPapers(name: string) {*/
  /*const papers = await got*/
    /*.get(`https://api.semanticscholar.org/graph/v1/paper/search?query=${name}`)*/
    /*.json();*/
  /*return papers;*/
/*}*/

export async function getPaper(id: string): Promise<Paper> {
  if (!id) {
    throw new Error("paper id is null");
  }
  const paper = await got.get(
    `https://api.semanticscholar.org/graph/v1/paper/${id}?fields=title,authors,year`
  ).json<Paper>();
  return paper;
}

export async function getPaperWithCitations(paperId: string): Promise<PaperWithCitations> {
  const res = await got
    .get(`https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=title,authors,year,citations`)
    .json<PaperWithCitations>();
  return res;
}