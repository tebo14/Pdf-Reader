import {
  pipe,
  gotenberg,
  convert,
  office,
  to,
  landscape,
  set,
  filename,
  please,
} from 'gotenberg-js-client'
import fs from "fs";
console.log('Begin Converter');
const toPDF = pipe(
  gotenberg('http://localhost:3000'),
  convert,
  office,
  to(landscape),
  set(filename('result.pdf')),
  please
)

const currentDirectory = "./input";
const outputFolder = "./output";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

const convertDocs = async () => {
  const readInputDirectory = fs.readdirSync(currentDirectory).filter(file => file.includes(".rtf"));
  if (readInputDirectory && readInputDirectory.length > 0) {
    console.log(`${readInputDirectory.length} file(s) to convert`);
    let index = 0;
    for (const file of readInputDirectory) {
      index += 1;
      console.log(`~~~~~~~~~`);
      console.log(`File #${index}`);
      console.log(`Converting: ${currentDirectory}/${file}`);
      const pdf = await toPDF(`file://input/${file}`);
      const newFileName = file.replace(".rtf", "") + ".pdf";
      pdf.pipe(fs.createWriteStream(`./output/${newFileName}`));
      console.log(`${file} finished converting`);
      console.log(`Output: ${outputFolder}/${newFileName}`)
    }
    console.log('Conversion complete');
  }
  else {
    console.log('No files to convert');
  }
  console.log('Exiting...')
}

convertDocs();
