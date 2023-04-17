import _ from 'lodash';

const isParentNode = (obj) => _.isObject(obj) && !Array.isArray(obj);

function getValuesFromNested(key, node, type = '') {
  if (isParentNode(node)) {
    return {
      parent: {
        type,
        key,
        value: Object.keys(node).map(
          (k) => getValuesFromNested(k, node[k]),
        ),
      },
    };
  }
  return {
    child: {
      type: '',
      key,
      value: node,
    },
  };
}

function getMergedKeys(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return _.union(keys1, keys2).sort();
}

export default function getDiff(obj1, obj2) {
  const mergedKeys = getMergedKeys(obj1, obj2);
  const res = mergedKeys.reduce((acc, key) => {
    if (isParentNode(obj1[key]) && isParentNode(obj2[key])) {
      if ((key in obj1) && (key in obj2)) {
        acc.push({
          parent: {
            type: 'common',
            key,
            value: getDiff(obj1[key], obj2[key]),
          },
        });
      }
      if (!(key in obj1) && key in obj2) {
        acc.push({
          parent: {
            type: 'added',
            key,
            value: getDiff(obj1[key], obj2[key]),
          },
        });
      }
      if (key in obj1 && !(key in obj2)) {
        acc.push({
          parent: {
            type: 'deleted',
            key,
            value: getDiff(obj1[key], obj2[key]),
          },
        });
      }
      return acc;
    }

    if (!isParentNode(obj1[key]) && !isParentNode(obj2[key])) {
      if (!(key in obj1) && key in obj2) {
        acc.push({
          child: {
            type: 'added',
            key,
            value: obj2[key],
          },
        });
      }
      if (key in obj1 && !(key in obj2)) {
        acc.push({
          child: {
            type: 'deleted',
            key,
            value: obj1[key],
          },
        });
      }
      if (key in obj1 && key in obj2 && obj1[key] !== obj2[key]) {
        acc.push({
          child: {
            type: 'different value',
            key,
            value1: obj1[key],
            value2: obj2[key],
          },
        });
      }
      if (obj1[key] === obj2[key]) {
        acc.push({
          child: {
            type: 'common',
            key,
            value: obj1[key],
          },
        });
      }
      return acc;
    }

    if (!isParentNode(obj1[key]) && isParentNode(obj2[key])) {
      if (obj1[key]) {
        acc.push({
          child: {
            type: 'deleted',
            key,
            value: obj1[key],
          },
        });
      }
      acc.push(getValuesFromNested(key, obj2[key], 'added'));
    }

    if (isParentNode(obj1[key]) && !isParentNode(obj2[key])) {
      acc.push(getValuesFromNested(key, obj1[key], 'deleted'));
      if (obj2[key]) {
        acc.push({
          child: {
            type: 'added',
            key,
            value: obj2[key],
          },
        });
      }
    }
    return acc;
  }, []);
  return res;
}
