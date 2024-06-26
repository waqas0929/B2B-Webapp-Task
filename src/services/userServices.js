import redisClient from "../db/redisConfig.js";
import userModel from "../models/userModel.js";

(async () => {
  try {
    await redisClient.set('test_key', 'test_value');
    const value = await redisClient.get('test_key');
    console.log('Test key value:', value); // Should output 'test_value'
  } catch (error) {
    console.error('Redis test error:', error);
  }
})();

async function getUserData(userId) {
  const cacheKey = `user:${userId}`;

  const cacheData = await new Promise((resolve, reject) => {
    redisClient.get(cacheKey, (err, result) => {
      if (err) {
        console.error("Redis GET error:", err);
        return resolve(null);
      }
      console.log("Redis GET result:", result);
      resolve(result ? JSON.parse(result) : null);
    });
  });

  if (cacheData) {
    console.log("Returning data from cache");
    return cacheData;
  }

  const userData = await fetchUserDataFromDB(userId);
  if (!userData) {
    throw new Error("User not found");
  }

  redisClient.setEx(cacheKey, 3600, JSON.stringify(userData), (err) => {
    if (err) {
      console.error("Redis SET error:", err);
    }
  });

  return userData;
}

async function fetchUserDataFromDB(userId) {
  const user = await userModel.findByPk(userId, {
    attributes: ['id', 'firstName', 'lastName', 'email']
  });
  return user ? user.toJSON() : null;
}

export default getUserData;
