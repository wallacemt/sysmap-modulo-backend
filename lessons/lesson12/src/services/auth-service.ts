import { grantAchievement } from "./user-achievements-service";
import { createUser, getUserByEmail } from "./user-service";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;

export async function createAccount(userData: any) {
  const user = await createUser({ ...userData, avatar: "" });
  await grantAchievement("Novato", user.id);
}

export async function authenticate(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (password != user.password) {
    throw new Error("Senha incorreta.");
  }

  const token = jwt.sign(user, jwtSecret, { expiresIn: "1d" });
  await grantAchievement("Primeiro Login", user.id);

  return token;
}
