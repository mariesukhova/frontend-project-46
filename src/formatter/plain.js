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
  const iter = (data, path = '') => {
    const result = data.map(({
      key, value, type, isParent, value1, value2,
    }) => {
      const newPath = !path ? key : `${path}.${key}`;

      if (type === 'added') {
        return `Property '${newPath}' was added with value: ${formatValue(value)}`;
      }
      if (type === 'deleted') {
        return `Property '${newPath}' was removed`;
      }
      if (type === 'different value') {
        return `Property '${newPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
      }
      if (isParent) {
        return iter(value, newPath);
      }
      return null;
    });

    return result.filter((i) => i !== null).join('\n');
  };

  return iter(diff);
}
