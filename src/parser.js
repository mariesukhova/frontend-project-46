// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

const parser = (file, type) => {
  switch (type) {
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    case '.json':
    default:
      return JSON.parse(file);
  }
};

export default parser;
