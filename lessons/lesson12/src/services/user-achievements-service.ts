import * as achievementService from "./achievements-service";
import * as userAchievementRepository from "../repositories/user-achievements-repository";

export async function grantAchievement(
  achievementName: string,
  userId: string
) {
  const achievement = await achievementService.getAchievementByName(
    achievementName
  );

  const userAchievement =
    await userAchievementRepository.findByAchievementIdAndUserId(
      achievement!.id,
      userId
    );

  if (userAchievement) return;

  await userAchievementRepository.create({
    achievementId: achievement?.id,
    userId,
  });
}

export async function getUserAchievements(userId: string) {
  return await userAchievementRepository.findAchievementsByUserId(userId);
}
