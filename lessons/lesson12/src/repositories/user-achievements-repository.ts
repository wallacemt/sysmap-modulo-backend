import prisma from "../orm/prisma";

export async function create(data: any) {
  await prisma.userAchievements.create({
    data,
  });
}

export async function findAchievementsByUserId(userId: string) {
  return await prisma.userAchievements.findMany({
    where: {
      userId,
    },
    include: {
      achievement: true,
    },
  });
}

export async function findByAchievementIdAndUserId(
  achievementId: string,
  userId: string
) {
  return await prisma.userAchievements.findUnique({
    where: {
      userId_achievementId: {
        userId,
        achievementId,
      },
    },
  });
}
