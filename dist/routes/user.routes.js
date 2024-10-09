"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_usecase_1 = require("../usecases/user.usecase");
async function userRoutes(fastify) {
    const userUseCase = new user_usecase_1.UserUseCase();
    // Criar um novo usuário
    fastify.post("/", {
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
    }, async (req, reply) => {
        const { name, email } = req.body;
        try {
            const data = await userUseCase.create({
                name,
                email,
            });
            return reply.send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
    // Rota exemplo para testar a API
    fastify.get("/", {
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
    }, (req, reply) => {
        reply.send({ hello: "world" });
    });
}
exports.userRoutes = userRoutes;
