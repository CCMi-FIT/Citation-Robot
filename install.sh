npm install
mkdir input output
echo -e '[\n  "someSemanticScholarPaperId1",\n  "someSemanticScholarPaperId2"\n]' | cat > input/papers.json
npm run build