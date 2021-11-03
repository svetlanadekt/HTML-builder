const fs = require('fs');
const path = require('path');
const { stdin } = require('process');
const process = require('process'); 

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));   //созд поток по этому пути в кот будет запис текст

console.log('Hello! Write smth:');
stdin.on('data', data => {
  let str = data.toString().trim();
  if(str === 'exit') {
    process.exit(); 
  } else {
    stream.write(data);
  }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => console.log('Bye!See you later.'));

