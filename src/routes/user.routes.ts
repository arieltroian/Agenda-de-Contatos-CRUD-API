import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();
  fastify.post<{ Body: UserCreate }>("/", (req, reply) => {
    const { name, email } = req.body;
    try {
      const data = userUseCase.create({
        name,
        email,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}
