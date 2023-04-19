import _ from 'lodash';

function formatValue(val) {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return `${val}`;
}

function createString(element, newPath, iter) {
  const {
    value, type, isParent, value1, value2,
  } = element;

  if (isParent) {
    return iter(value, newPath);
  }
  if (type === 'added') {
    return `Property '${newPath}' was added with value: ${formatValue(value)}`;
  }
  if (type === 'deleted') {
    return `Property '${newPath}' was removed`;
  }
  if (type === 'different value') {
    return `Property '${newPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
  }
  return null;
}

export default function getPlain(diff) {
  const iter = (data, path = '') => {
    const result = data.map((element) => {
      const newPath = !path ? element.key : `${path}.${element.key}`;
      return createString(element, newPath, iter);
    });

    return result.filter((i) => i !== null).join('\n');
  };

  return iter(diff);
}
