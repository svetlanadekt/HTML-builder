const fs = require('fs');
const path = require('path');
const resultFile = path.join(__dirname,'project-dist', 'bundle.css');
const folder = path.join(__dirname,'styles');


fs.stat(resultFile, function(err) {
  if (err) { 
    fs.readdir(path.join(__dirname,'styles'), {withFileTypes: true}, (err, data) => { 
      for (let i = 0; i < data.length; i++) {
        if(data[i].isFile() && (path.parse(data[i].name).ext) == '.css') {
          const readStream = fs.ReadStream(path.join(folder, data[i].name));
          readStream.on('data', (chunk) => {
            fs.appendFile(resultFile, chunk, (err) => {
              if (err) {
                console.log(err);
              }
            });
          });
        }
      }
    });
  } else {
    fs.unlink(resultFile, function (err) {
      if (err) throw err;
    });
    fs.readdir(path.join(__dirname,'styles'), {withFileTypes: true}, (err, data) => { 
      for (let i = 0; i < data.length; i++) {
        if(data[i].isFile() && (path.parse(data[i].name).ext) == '.css') {
          const readStream = fs.ReadStream(path.join(folder, data[i].name));
          readStream.on('data', (chunk) => {
            fs.appendFile(resultFile, chunk, (err) => {
              if (err) {
                console.log(err);
              }
            });
          });
        }
      }
    });
  }
});
     






