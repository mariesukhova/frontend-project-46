export default function getStylish(diff) {
  const iter = (data, depth, replacer = ' ', spacesCount = 4) => {
    // console.log(data)
    const result = data.map((obj) => {
      const indent = spacesCount * depth - 2;
      if (obj.parent) {
        const { key, value } = obj.parent;
        switch (obj.parent.type) {
          case 'added':
            return `\n${replacer.repeat(indent)}+ ${key}: {${iter(value, (depth + 1))}\n${replacer.repeat(indent + 2)}}`;
          case 'deleted':
            return `\n${replacer.repeat(indent)}- ${key}: {${iter(value, (depth + 1))}\n${replacer.repeat(indent + 2)}}`;
          default:
            return `\n${replacer.repeat(indent)}  ${key}: {${iter(value, (depth + 1))}\n${replacer.repeat(indent + 2)}}`;
        }
      }
      const { key, value } = obj.child;
      switch (obj.child.type) {
        case 'added':
          return `\n${replacer.repeat(indent)}+ ${key}: ${value}`;
        case 'deleted':
          return `\n${replacer.repeat(indent)}- ${key}: ${value}`;
        case 'different value':
          return `\n${replacer.repeat(indent)}- ${key}: ${obj.child.value1}\n${replacer.repeat(indent)}+ ${key}: ${obj.child.value2}`;
        default:
          return `\n${replacer.repeat(indent)}  ${key}: ${value}`;
      }
    });
    return result.join('');
  };
  return `{${iter(diff, 1)}\n}`;
}
