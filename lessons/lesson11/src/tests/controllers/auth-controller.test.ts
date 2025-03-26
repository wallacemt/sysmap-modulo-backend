import { describe, expect, test, jest } from "@jest/globals";
import request from "supertest";
import express, { json } from "express";
import authController from "../../controllers/auth-controller";
import bcrypt from "bcryptjs";

jest.mock("../../repository/user-repository", () => ({
  getByEmail: (email: string) =>
    email === "igor@gmail.com"
      ? {
          id: "123",
          name: "Igor",
          email: "igor@gmail.com",
          password: bcrypt.hash("123456", 10),
        }
      : null,
}));

jest.mock("bcryptjs", () => ({
  compare: (password: string) => password === "123456",
  hash: () => "abcd",
}));

jest.mock("jsonwebtoken", () => ({
  sign: () => "abcd",
}));

const server = express();
server.use(json());
authController(server);

describe("Auth Controller", () => {
  describe("POST /auth", () => {
    test("Should return 400 when request body is invalid", async () => {
      const response = await request(server).post("/auth").send({
        password: "4892719401",
      });

      expect(response.text).toBe(
        "Informe os campos obrigatórios corretamente."
      );
      expect(response.status).toBe(400);
    });

    test("Should return 404 when user is not found", async () => {
      const response = await request(server).post("/auth").send({
        email: "igor2@gmail.com",
        password: "4892719401",
      });

      expect(response.status).toBe(404);
      expect(response.text).toBe("Usuário não encontrado.");
    });

    test("Should return 401 when password is wrong", async () => {
      const response = await request(server).post("/auth").send({
        email: "igor@gmail.com",
        password: "123457",
      });

      expect(response.status).toBe(401);
      expect(response.text).toBe("Senha incorreta.");
    });

    test("Should return 200 when authentication is successful", async () => {
      const response = await request(server).post("/auth").send({
        email: "igor@gmail.com",
        password: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.text).toBe("abcd");
    });
  });
});