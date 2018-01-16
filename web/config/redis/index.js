const Redis = require('redis')
const wrapper = require('co-redis')
const redisConfig = require('./config')

const redisCache = (prefix,expire = 86400) => {
  // expire = expire || 86400;
  redisConfig.expire = expire
  let redisAvailable = false;

  const redisClient = wrapper(Redis.createClient(redisConfig));
  redisClient.on('error', (err) => {
    redisAvailable = false;
    console.log(err);
  });
  redisClient.on('end', () => {redisAvailable = false;});
  redisClient.on('connect', () => {redisAvailable = true;});

  const setCache = async(key, value, option = {}) => {
    if (!redisAvailable) {return;}
    if (value === null) {return;}
    const ttl = option.expire || expire;
    await redisClient.setex(`${prefix}${key}`, ttl, JSON.stringify(value));
  };
  const hmsetCache = async(key, value,option = {}) => {
    if (!redisAvailable) {return;}
    if (value === null) {return;}
    const ttl = option.expire || expire;
    await redisClient.hmset(`${prefix}${key}`,value);
    await redisClient.expire(`${prefix}${key}`,ttl);
  };
  const hgetallCache = async(key) => {
    if (!redisAvailable) {return;}
    const data = await redisClient.hgetall(`${prefix}${key}`);
    if (!data) {return null;}
    return data
  };
  const getCache = async(key) => {
    if (!redisAvailable) {return;}
    const data = await redisClient.get(`${prefix}${key}`);
    if (!data) {return null;}
    return JSON.parse(data.toString())
  };
  const removeCache = async(key) => {
    if (!redisAvailable) {return;}
    await redisClient.del(`${prefix}${key}`);
  };
  const cacheMiddleware = async function(ctx, next) {
    ctx.cache = {
      get: getCache,
      set: setCache,
      hmset:hmsetCache,
      hgetall:hgetallCache,
      destroy: removeCache
    };
    await next();
  };

  return cacheMiddleware;
};

module.exports = redisCache
