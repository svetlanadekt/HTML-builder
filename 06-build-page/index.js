const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const styleFile = path.join(__dirname, 'project-dist', 'style.css');
const assets = path.join(__dirname, 'project-dist', 'assets');
const styleFolder = path.join(__dirname,'styles');
const assetsFolder = path.join(__dirname,'assets');
const fonts = path.join(__dirname, 'project-dist', 'assets', 'fonts');
const img = path.join(__dirname, 'project-dist', 'assets', 'img');
const svg = path.join(__dirname, 'project-dist', 'assets', 'svg');
const template = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');
const resultHtml = path.join(__dirname, 'project-dist', 'index.html');

const dest = path.join(__dirname, 'project-dist');



async function builder() {
  await fsp.rm(dest, { recursive: true, force: true }, () => {});

  //созд папку project-dist
  fs.mkdir(path.join(__dirname, 'project-dist'), err => {
    if(err) throw err;   
  });
 
  fs.readFile(template, 'utf-8', (err, item) => {
    if(err) throw err; 
    // console.log(item);
    fs.readdir(componentsFolder, (err, data) => { 
    // console.log(data);

      data.forEach(async (el) => {
        const fileInfo = path.parse(el);
        await fs.readFile(path.join(componentsFolder, el), 'utf-8', (err, items) => {
          if(err) throw err; 
          item = item.replace(`{{${fileInfo.name}}}`, items);
          fs.writeFile(resultHtml, item, (err) => {
            if (err) throw new Error('Error with write date');
          });
        });
       
      }); 
    });
  });
 

  //создаем файл со стилями
  fs.readdir(path.join(__dirname,'styles'), {withFileTypes: true}, (err, data) => { 
    for (let i = 0; i < data.length; i++) {
      if(data[i].isFile() && (path.parse(data[i].name).ext) == '.css') {
        const readStream = fs.ReadStream(path.join(styleFolder, data[i].name));
        readStream.on('data', (chunk) => {
          fs.appendFile(styleFile, chunk, (err) => {
            if (err) {
              console.log(err);
            }
          });
        });
      }
    }
  });
    
  // create assets folder
  fs.mkdir(assets, (err) => {
    if (err) throw err;
  });
  fs.mkdir(fonts, (err) => {
    if(err) throw err;
  });
  fs.mkdir(img, (err) => {
    if(err) throw err;
  });
  fs.mkdir(svg, (err) => {
    if(err) throw err;
  });
  
  fs.readdir(assetsFolder, (err, data) => { 
    for (let i = 0; i < data.length; i++) {
      fs.readdir(path.join(assetsFolder, data[i]), (err, el) => {
        for (let j = 0; j < el.length; j++) {
          fs.copyFile(path.join(assetsFolder, data[i], el[j]), path.join(assets, data[i], el[j]), (err) => {
            if (err) throw err;
          }); 
        }
      }); 
    }
  });    
}
builder();

