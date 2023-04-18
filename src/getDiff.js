import _ from 'lodash';

export const isParentNode = (obj) => _.isObject(obj) && !Array.isArray(obj);

function getMergedKeys(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return _.union(keys1, keys2).sort();
}

export default function getDiff(obj1, obj2) {
  const mergedKeys = getMergedKeys(obj1, obj2);
  const res = mergedKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (isParentNode(value1) && isParentNode(value2)) {
      if ((key in obj1) && (key in obj2)) {
        acc.push({
          isParent: true,
          type: 'common',
          key,
          value: getDiff(value1, value2),
        });
      }
      if (!(key in obj1) && key in obj2) {
        acc.push({
          isParent: true,
          type: 'added',
          key,
          value: getDiff(value1, value2),
        });
      }
      if (key in obj1 && !(key in obj2)) {
        acc.push({
          isParent: true,
          type: 'deleted',
          key,
          value: getDiff(value1, value2),
        });
      }
      return acc;
    }

    if (!isParentNode(value1) || !isParentNode(value2)) {
      if (!(key in obj1) && key in obj2) {
        acc.push({
          isParent: false,
          type: 'added',
          key,
          value: value2,
        });
      }
      if (key in obj1 && !(key in obj2)) {
        acc.push({
          isParent: false,
          type: 'deleted',
          key,
          value: value1,
        });
      }
      if (key in obj1 && key in obj2 && value1 !== value2) {
        acc.push({
          isParent: false,
          type: 'different value',
          key,
          value1,
          value2,
        });
      }
      if (value1 === value2) {
        acc.push({
          isParent: false,
          type: 'common',
          key,
          value: value1,
        });
      }
      return acc;
    }

    return acc;
  }, []);

  return res;
}
