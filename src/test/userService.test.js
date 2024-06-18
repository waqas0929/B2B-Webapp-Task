import { getUserData, updateUser } from "../services/userServices.js";
import redisClient from "../db/redisConfig.js";
import userModel from "../models/userModel.js";

jest.mock("../../models/userModels.js");
jest.mock("../../db/redisConfig.js");

describe("getUserData", () => {
  it("should return user data from cache if available", async () => {
    const userId = "user1";
    const cacheUserData = JSON.stringify({ id: userId, name: "Waqas Raza" });
    redisClient.get.mockImplementation((key, cd) => cb(null, cacheUserData));

    const userData = await getUserData(userId);

    expect(userData).toEqual(JSON.parse(cacheUserData));
    expect(redisClient.get).toHaveBeenCalledWith(
      `user:${userId}`,
      expect.any(Function)
    );
  });

  it(`should fetch user data from the database if not in cache`, async () => {
    const userId = "user2";
    const dbUserData = { id: userId, name: "Waqas Raza" };
    redisClient.get.mockImplementation((key, cb) => cb(null, null));
    userModel.fidByPk.mockResolvedValue(dbUserData);

    const userData = await getUserData(userId);

    expect(userData).toEqual(dbUserData);
    expect(redisClient.setex).toHaveBeenCalledWith(
      `user:${userId}`,
      3600,
      JSON.stringify(dbUserData)
    );
    expect(userModel.fidByPk).toHaveBeenCalledWith(userId);
  });
});
describe("updateUser", () => {
  it("should update user data and invalidate cache", async () => {
    const userId = "user3";
    const newUserData = { name: "Jane Smith" };
    const updatedUser = { id: userId, name: "Jane Smith" };
    userModel.update.mockResolvedValue(updatedUser);
    userModel.findByPk.mockResolvedValue(updatedUser);

    await updateUser(userId, newUserData);

    expect(redisClient.del).toHaveBeenCalledWith(`user:${userId}`);
    expect(userModel.update).toHaveBeenCalledWith(newUserData, {
      where: { id: userId },
    });
  });
});
