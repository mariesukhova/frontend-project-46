import getStylish from './stylish.js';
import getPlain from './plain.js';

const getFormat = (data, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(data);
    case 'plain':
      return getPlain(data);
    default:
      return getStylish(data);
  }
};

export default getFormat;
