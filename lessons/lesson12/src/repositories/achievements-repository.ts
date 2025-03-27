import prisma from "../orm/prisma";

export async function createMany(data: any[]) {
  await prisma.achievement.createMany({
    data,
  });
}

export async function findByName(name: string) {
  return await prisma.achievement.findUniqueOrThrow({
    where: {
      name,
    },
  });
}

export async function getCount() {
  return await prisma.achievement.count();
}
