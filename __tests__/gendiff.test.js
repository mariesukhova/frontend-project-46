import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');

test('test1', async () => {
  const result = gendiff(filePath1, filePath2);

  const diff = `{
    - follow : false
      host : hexlet.io
    - proxy : 123.234.53.22
    - timeout : 50 
    + timeout : 20
    + verbose : true
   }`

  expect(result).toEqual(diff);
});