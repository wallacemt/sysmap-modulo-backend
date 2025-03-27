import * as userRepository from "../repositories/user-repository";
import { getUserAchievements } from "./user-achievements-service";

export async function createUser(userData: any) {
  return await userRepository.create(userData);
}

export async function getUserById(id: string) {
  const user = await userRepository.findById(id);
  const userAchievements = await getUserAchievements(id);
  const mappedUserAchievements = userAchievements.map(
    (userAchievement) => userAchievement.achievement
  );

  return { ...user, achievements: mappedUserAchievements };
}

export async function getUserByEmail(email: string) {
  return await userRepository.findByEmail(email);
}
