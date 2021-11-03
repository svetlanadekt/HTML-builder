
const { parse } = require('path');
const fs = require('fs');

const pathsToCheck = ['./03-files-in-folder/secret-folder/data.csv', './03-files-in-folder/secret-folder/script.js', './03-files-in-folder/secret-folder/style.css', './03-files-in-folder/secret-folder/text.txt'];

for (let i = 0; i < pathsToCheck.length; i++) {
  fs.stat(pathsToCheck[i], (err, stats) => {
    if(stats.isFile()) {
      let size = stats.size;
      console.log(`${parse(pathsToCheck[i]).name} - ${parse(pathsToCheck[i]).ext.slice(1)} - ${size} b`);
    }
  });
}

