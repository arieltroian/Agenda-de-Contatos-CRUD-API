import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  // Criar um novo usuário
  fastify.post<{ Body: UserCreate }>(
    "/",
    {
      schema: {
        body: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
          },
        },
        response: {
          200: {
            description: "Usuário criado com sucesso",
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { name, email } = req.body;
      try {
        const data = await userUseCase.create({
          name,
          email,
        });
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  // Rota exemplo para testar a API
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: {
            description: "Hello world response",
            type: "object",
            properties: {
              hello: { type: "string" },
            },
          },
        },
      },
    },
    (req, reply) => {
      reply.send({ hello: "world" });
    }
  );
}
