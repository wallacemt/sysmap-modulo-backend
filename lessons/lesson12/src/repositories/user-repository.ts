import prisma from "../orm/prisma";

export async function create(data: any) {
  return await prisma.user.create({
    data,
  });
}

export async function findById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function findByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
