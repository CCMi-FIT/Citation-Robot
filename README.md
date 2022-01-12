# Citation Robot

Script using the [Semantic Scholar API](https://www.semanticscholar.org/product/api#Documentation) for making citations reports of papers.

## Usage

The scripts takes `input/papers.json` file, which is supposed to be an array of Semantic Scholar paper IDs, such as:

```json
[
  "6ba00c2386f2edc0b43eec442cd1923b5d964633",
  "fbe778f000a71b337a5f432e5e81cc006259a66c",
  "ce1cde6fa66daa3653940118f81e9167ca09943c"
]
```

The CSV citation report is stored in `output/report.csv`.

## Useful Queries

To get a paper ID, you may want to search for it, e.g.:

https://api.semanticscholar.org/graph/v1/paper/search?query=openponk&fields=title,year,authors

Please note that this query returns just the first 10 results. For more details, consult [the documentation](https://www.semanticscholar.org/product/api#Documentation).
