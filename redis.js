const redis = require("redis");
let client;

function connectToRedis() {
  if (!client || !client.connected) {
    client = redis.createClient({
      host: "127.0.0.1",
      port: 6379,
    });

    client.on('error', (err) => {
      console.error('Redis connection error:', err);
    });

    client.on('connect', () => {
      console.log('Connected to Redis');
    });
  }

  return client;
}

module.exports = connectToRedis;