import fs from 'fs';
import path from 'path';
import getDiff from './getDiff.js';
import parser from './parser.js';
import getFormat from './formatter/formatterParser.js';

const gendiff = (filepath1, filepath2) => {
  const firstFile = fs.readFileSync(path.resolve(filepath1));
  const secondFile = fs.readFileSync(path.resolve(filepath2));

  const firstFileParsed = parser(firstFile, path.extname(filepath1));
  const secondFileParsed = parser(secondFile, path.extname(filepath2));

  const difference = getDiff(firstFileParsed, secondFileParsed);
  return getFormat(difference, 'stylish');
};

export default gendiff;
