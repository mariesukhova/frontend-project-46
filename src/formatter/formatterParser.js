import getStylish from './stylish.js';

const getFormat = (data, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(data);
    default:
      return [];
  }
};

export default getFormat;
