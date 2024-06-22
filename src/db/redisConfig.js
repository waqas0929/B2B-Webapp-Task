import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379', // Ensure the Redis URL is correct
  password: process.env.REDIS_PASSWORD || '' // Use environment variable or default
});

redisClient.on('error', (error) => {
  console.error(`Redis error: ${error}`);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('reconnecting', () => {
  console.log('Reconnecting to Redis');
});

redisClient.on('end', () => {
  console.log('Redis connection closed');
});

(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis successfully');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();

export default redisClient;
