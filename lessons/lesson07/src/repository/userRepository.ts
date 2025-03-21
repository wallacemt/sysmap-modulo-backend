import prisma from "../prisma/prismaClient";
import userData from "../types/userData";

export async function getAll() {
  return await prisma.user.findMany();
}

export async function getById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function create(data: userData) {
  return await prisma.user.create({ data });
}

export async function update(data: userData, id: string) {
  return await prisma.user.update({
    data,
    where: {
      id,
    },
  });
}

export async function remove(id: string) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}
