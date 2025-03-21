import prisma from "../prisma/prismaClient";


export async function getAll() {
    return await prisma.activity.findMany();
  }

export async function getByUserId(userId: string) {
  return await prisma.activity.findMany({
    where: {
        userId,
    },
  });
}

export async function create(data: any) {
  return await prisma.activity.create({ data });
}