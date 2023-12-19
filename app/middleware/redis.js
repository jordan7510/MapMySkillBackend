const Redis = require("redis");

const REDIS_HOST = "clustercfg.mapmyskill.nadpbz.eun1.cache.amazonaws.com";
const REDIS_PORT = 6379;
const REDIS_PASSWORD = "mapmyskillrediscachetoken"

const redisClient = Redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password:REDIS_PASSWORD
});

const DEFAULT_EXPIRATION = 3600;

function getOrSetCache(key, cb) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) {
                return reject(error);
            }
            if (data != null) {
                return resolve(JSON.parse(data));
            }
            const freshData = await cb();
            redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
            resolve(freshData);
        });
    });
}

module.exports = { getOrSetCache };
