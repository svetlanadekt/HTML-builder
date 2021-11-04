const fs = require('fs');
const path = require('path');
const folderCopy = path.join(__dirname,'copy-files');
const folder = path.join(__dirname,'files');


fs.stat(folderCopy, function(err) {
  if (err) { 
    fs.mkdir(folderCopy, {recursive: true}, (err) => {
      if (err) throw err;
    });
    
    
    fs.readdir(folder, (err, data) => {  // получили массив из файлов
      data.forEach(file => {
        fs.copyFile(path.join(folder, file), path.join(folderCopy, file), (err) => {
          if (err) throw err;
        }); 
      });
    });
    
  } else {
    fs.readdir(folderCopy, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(folderCopy, file), (err) => {
          if (err) throw err;
        });
      }
    });

    fs.mkdir(folderCopy, {recursive: true}, (err) => {
      if (err) throw err;
    });
    
    fs.readdir(folder, (err, data) => {  // получили массив из файлов
      data.forEach(file => {
        fs.copyFile(path.join(folder, file), path.join(folderCopy, file), (err) => {
          if (err) throw err;
        }); 
      });
    });  
  }
});









