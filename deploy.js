const fs = require('fs');

const fileContent = 'https://markdown-flashcard.surge.sh';
const filepath = `${__dirname}/build/CNAME`;
fs.writeFile(filepath, fileContent, () => {
  console.log('written');
});