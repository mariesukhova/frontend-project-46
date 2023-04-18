import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(spacesCount * depth - 2);

const getContent = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${getIndent(depth + 1)}  ${key}: ${getContent(value[key], depth + 1)}`);
  return `{\n${result.join('\n')}\n${getIndent(depth)}  }`;
};

export default function getStylish(diff) {
  const iter = (data, depth) => {
    const result = data.map((element) => {
      const {
        key, value, value1, value2, isParent, type,
      } = element;

      if (isParent) {
        switch (type) {
          case 'added':
            return `\n${getIndent(depth)}+ ${key}: {${iter(value, (depth + 1))}\n${getIndent(depth)}}`;
          case 'deleted':
            return `\n${getIndent(depth)}- ${key}: {${iter(value, (depth + 1))}\n${getIndent(depth)}}`;
          case 'different value':
            if (Array.isArray(value1)) {
              return `\n${getIndent(depth)}- ${key}: {${iter(value1, (depth + 1))}\n${getIndent(depth)}  }\n${getIndent(depth)}+ ${key}: ${value2}`;
            }
            return `\n${getIndent(depth)}- ${key}: ${value1}\n${getIndent(depth)}+ ${key}: {${iter(value2, (depth + 1))}\n${getIndent(depth)}  }`;
          default:
            return `\n${getIndent(depth)}  ${key}: {${iter(value, (depth + 1))}\n${getIndent(depth)}  }`;
        }
      }
      switch (type) {
        case 'added':
          return `\n${getIndent(depth)}+ ${key}: ${getContent(value, depth)}`;
        case 'deleted':
          return `\n${getIndent(depth)}- ${key}: ${getContent(value, depth)}`;
        case 'different value':
          return `\n${getIndent(depth)}- ${key}: ${getContent(value1, depth)}\n${getIndent(depth)}+ ${key}: ${getContent(value2, depth)}`;
        default:
          return `\n${getIndent(depth)}  ${key}: ${getContent(value, depth)}`;
      }
    });
    return result.join('');
  };
  return `{${iter(diff, 1)}\n}`;
}
