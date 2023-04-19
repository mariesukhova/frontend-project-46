import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);
const getContent = (filePath) => fs.readFileSync(filePath, 'utf-8');

test('different json files with stylish format', async () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const resultPath = getFixturePath('resultStylish.txt');
  const result = getContent(resultPath);
  const diff = gendiff(filePath1, filePath2);

  expect(diff).toEqual(result);
});

test('different yml files with stylish format', async () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const resultPath = getFixturePath('resultStylish.txt');
  const result = getContent(resultPath);
  const diff = gendiff(filePath1, filePath2);

  expect(diff).toEqual(result);
});

test('different json files with plain format', async () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const resultPath = getFixturePath('resultPlain.txt');
  const result = getContent(resultPath);
  const diff = gendiff(filePath1, filePath2, 'plain');

  expect(diff).toEqual(result);
});

test('different yml files with plain format', async () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const resultPath = getFixturePath('resultPlain.txt');
  const result = getContent(resultPath);
  const diff = gendiff(filePath1, filePath2, 'plain');

  expect(diff).toEqual(result);
});

test('different json files with JSON format', async () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const resultPath = getFixturePath('resultJSON.txt');
  const result = getContent(resultPath);
  const diff = gendiff(filePath1, filePath2, 'json');

  expect(diff).toEqual(result);
});

test('different yaml files with JSON format', async () => {
  const filePath1 = getFixturePath('file1.yaml');
  const filePath2 = getFixturePath('file2.yaml');
  const resultPath = getFixturePath('resultJSON.txt');
  const result = getContent(resultPath);
  const diff = gendiff(filePath1, filePath2, 'json');

  expect(diff).toEqual(result);
});
