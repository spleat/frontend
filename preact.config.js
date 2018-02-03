export default (config, env, helpers) => {
  config.node.process = 'mock';

  return config;
};
