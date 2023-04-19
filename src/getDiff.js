import _ from 'lodash';

export const isParentNode = (obj) => _.isObject(obj) && !Array.isArray(obj);

function getMergedKeys(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  return _.sortBy(allKeys);
}

function getType(key, obj1, obj2) {
  if ((key in obj1 && key in obj2) || obj1[key] === obj2[key]) {
    return 'common';
  }
  if (!(key in obj1) && key in obj2) {
    return 'added';
  }
  if (key in obj1 && !(key in obj2)) {
    return 'deleted';
  }
  return 'different value';
}

export default function getDiff(obj1, obj2) {
  const mergedKeys = getMergedKeys(obj1, obj2);
  const res = mergedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const type = getType(key, obj1, obj2);
    if (isParentNode(value1) && isParentNode(value2)) {
      return {
        isParent: true,
        type,
        key,
        value: getDiff(value1, value2),
      };
    }

    if (!isParentNode(value1) || !isParentNode(value2)) {
      if (key in obj1 && key in obj2 && value1 !== value2) {
        return {
          isParent: false,
          type: 'different value',
          key,
          value1,
          value2,
        };
      }
      return {
        isParent: false,
        type,
        key,
        value: !(key in obj1) && key in obj2 ? value2 : value1,
      };
    }
  });

  return res;
}
