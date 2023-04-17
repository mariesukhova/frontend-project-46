import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);
const getContent = (filePath) => fs.readFileSync(filePath, 'utf-8');

test('different json files', async () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const resultPath = getFixturePath('resultStylish.txt');
  const result = getContent(resultPath);
  const diff = gendiff(filePath1, filePath2);

  expect(diff).toEqual(result);
});

test('empty json files', async () => {
  const filePath1 = getFixturePath('file3.json');
  const filePath2 = getFixturePath('file4.json');
  const resultPath = getFixturePath('resultEmpty.txt');
  const result = getContent(resultPath);
  const diff = gendiff(filePath1, filePath2);

  expect(diff).toEqual(result);
});

test('different yaml files', async () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const resultPath = getFixturePath('resultStylish.txt');
  const result = getContent(resultPath);
  const diff = gendiff(filePath1, filePath2);

  expect(diff).toEqual(result);
});

test('empty yml files', async () => {
  const filePath1 = getFixturePath('file3.yml');
  const filePath2 = getFixturePath('file4.yml');
  const resultPath = getFixturePath('resultEmpty.txt');
  const result = getContent(resultPath);
  const diff = gendiff(filePath1, filePath2);

  expect(diff).toEqual(result);
});
