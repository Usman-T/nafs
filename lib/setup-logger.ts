let logger = null;

function getLogger() {
  if (!logger) {
    const pino = require('pino');

    logger = pino({
      transport: process.env.NODE_ENV !== 'production' ? {
        target: 'pino-pretty',
        options: { colorize: true }
      } : {
        target: 'pino/file',
        options: { destination: 1 } 
      }
    });
  }
  return logger;
}

console.log = (...args) => getLogger().info(args.length === 1 ? args[0] : args);
console.info = (...args) => getLogger().info(args.length === 1 ? args[0] : args);
console.warn = (...args) => getLogger().warn(args.length === 1 ? args[0] : args);
console.error = (...args) => getLogger().error(args.length === 1 ? args[0] : args);
