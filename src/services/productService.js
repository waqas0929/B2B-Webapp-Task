// import redisClient from "../db/redisConfig.js";
import userModel from "../models/userModel.js"; // Assuming you have a user model

async function getUserData(userId) {
  const cacheKey = `user:${userId}`;

  const cacheData = await new Promise((resolve, reject) => {
    redisClient.get(cacheKey, (err, result) => {
      if (err) {
        console.error(err);
        return resolve(null);
      }
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

  redisClient.setex(cacheKey, 3600, JSON.stringify(userData));

  return userData;
}

async function fetchUserDataFromDB(userId) {
  const user = await userModel.findByPk(userId, {
    attributes: ['id', 'firstName', 'lastName', 'email']
  });
  return user ? user.toJSON() : null;
}

export default getUserData;
