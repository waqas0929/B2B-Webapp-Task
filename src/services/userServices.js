import redisClient from "../db/redisConfig.js";

async function getUserData(userId) {
  const cacheKey = `user:${userId}`;

  const cacheData = await new promise((resolve, reject) => {
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
  return { id: userId, name: "Waqas Raza", email: "waqas1@gmail.com" };
}

export default getUserData;
