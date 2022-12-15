#!/usr/bin/env node
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('output the version number')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
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
    console.log(`{\n ${result.join('\n ')}\n}`);
  });
program.parse();

export default program;
