import _ from 'lodash';

export default function getDiff(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const mergedKeys = _.union(keys1, keys2).sort();

  const result = mergedKeys.map((key) => {
    if (obj1[key] === obj2[key]) {
      return `  ${key} : ${obj1[key]}`;
    }
    if (!(key in obj1) && key in obj2) {
      return `+ ${key} : ${obj2[key]}`;
    }
    if (key in obj1 && !(key in obj2)) {
      return `- ${key} : ${obj1[key]}`;
    }
    return `- ${key} : ${obj1[key]}\n + ${key} : ${obj2[key]}`;
  });

  if (result.length === 0) return '{\n}';

  return `{\n ${result.join('\n ')}\n}`;
}
