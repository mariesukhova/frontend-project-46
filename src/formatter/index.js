import getStylish from './stylish.js';
import getPlain from './plain.js';

const getFormat = (data, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(data);
    case 'plain':
      return getPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default getFormat;
