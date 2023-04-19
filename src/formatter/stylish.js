import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(spacesCount * depth - 2);

function getContent(value, depth) {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${getIndent(depth + 1)}  ${key}: ${getContent(value[key], depth + 1)}`);
  return `{\n${result.join('\n')}\n${getIndent(depth)}  }`;
}

function getSign(type) {
  switch (type) {
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    case 'different value':
      return ['-', '+'];
    default:
      return ' ';
  }
}

function createChildString(element, depth) {
  const {
    key, value, value1, value2, type,
  } = element;

  const sign = getSign(type);

  if (type === 'different value') {
    return `\n${getIndent(depth)}${sign[0]} ${key}: ${getContent(value1, depth)}\n${getIndent(depth)}${sign[1]} ${key}: ${getContent(value2, depth)}`;
  }

  return `\n${getIndent(depth)}${sign} ${key}: ${getContent(value, depth)}`;
}

function createParentString(element, depth, iter) {
  const {
    key, value, value1, value2, type,
  } = element;

  const sign = getSign(type);

  if (type === 'different value') {
    if (Array.isArray(value1)) {
      return `\n${getIndent(depth)}${sign[0]} ${key}: {${iter(value1, (depth + 1))}\n${getIndent(depth)}  }\n${getIndent(depth)}${sign[1]} ${key}: ${value2}`;
    }
    return `\n${getIndent(depth)}${sign[0]} ${key}: ${value1}\n${getIndent(depth)}${sign[1]} ${key}: {${iter(value2, (depth + 1))}\n${getIndent(depth)}  }`;
  }
  return `\n${getIndent(depth)}${sign} ${key}: {${iter(value, (depth + 1))}\n${getIndent(depth)}  }`;
}

export default function getStylish(diff) {
  const iter = (data, depth) => {
    const result = data.map((element) => {
      if (element.isParent) {
        return createParentString(element, depth, iter);
      }
      return createChildString(element, depth);
    });
    return result.join('');
  };
  return `{${iter(diff, 1)}\n}`;
}
