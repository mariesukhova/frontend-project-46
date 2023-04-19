import _ from 'lodash';

const formatValue = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return `${val}`;
};

export default function getPlain(diff) {
  const result = [];

  const iter = (data, path = '') => {
    data.forEach(({
      key, value, type, isParent, value1, value2,
    }) => {
      const newPath = !path ? key : `${path}.${key}`;

      if (type === 'added') {
        result.push(`Property '${newPath}' was added with value: ${formatValue(value)}`);
      }
      if (type === 'deleted') {
        result.push(`Property '${newPath}' was removed`);
      }
      if (type === 'different value') {
        result.push(`Property '${newPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`);
      }

      if (isParent) iter(value, newPath);
    });

    return result.join('\n');
  };

  return iter(diff);
}
