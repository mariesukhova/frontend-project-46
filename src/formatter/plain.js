import _ from 'lodash';

const formatValue = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (val === null || typeof val === 'boolean') {
    return val;
  }
  return `'${val}'`;
};

export default function getPlain(diff) {
  const result = [];

  const iter = (data, path = '') => {
    data.forEach(({
      key, value, type, isParent, value1, value2,
    }) => {
      const newPath = !path ? key : `${path}.${key}`;

      switch (type) {
        case 'added':
          result.push(`Property '${newPath}' was added with value: ${formatValue(value)}`);
          break;
        case 'deleted':
          result.push(`Property '${newPath}' was removed`);
          break;
        case 'different value':
          result.push(`Property '${newPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`);
          break;
        default:
          break;
      }

      if (isParent) iter(value, newPath);
    });

    return result.join('\n');
  };

  return iter(diff);
}
