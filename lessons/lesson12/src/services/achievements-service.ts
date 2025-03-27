import * as achievementRepository from "../repositories/achievements-repository";

export async function createAchievements(achievements: any[]) {
  const achievementsCount = await achievementRepository.getCount();
  if (achievements.length === achievementsCount) return;

  await achievementRepository.createMany(achievements);
}

export async function getAchievementByName(name: string) {
  return await achievementRepository.findByName(name);
}