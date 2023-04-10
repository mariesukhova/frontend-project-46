import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const gendiff = (filepath1, filepath2) => {
  const firstFile = fs.readFileSync(path.resolve(filepath1));
  const secondFile = fs.readFileSync(path.resolve(filepath2));

  const firstFileParsed = JSON.parse(firstFile);
  const secondFileParsed = JSON.parse(secondFile);

  const keys1 = Object.keys(firstFileParsed);
  const keys2 = Object.keys(secondFileParsed);
  const mergedKeys = _.union(keys1, keys2).sort();

  const result = mergedKeys.map((key) => {
    if (firstFileParsed[key] === secondFileParsed[key]) {
      return `  ${key} : ${firstFileParsed[key]}`;
    }
    if (!(key in firstFileParsed) && key in secondFileParsed) {
      return `+ ${key} : ${secondFileParsed[key]}`;
    }
    if (key in firstFileParsed && !(key in secondFileParsed)) {
      return `- ${key} : ${firstFileParsed[key]}`;
    }
    return `- ${key} : ${firstFileParsed[key]} \n + ${key} : ${secondFileParsed[key]}`;
  });
  return `{\n ${result.join('\n ')}\n}`;
};

export default gendiff;
