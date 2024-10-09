"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsRoutes = void 0;
const contact_usecase_1 = require("../usecases/contact.usecase");
const auth_middleware_1 = require("../middlewares/auth.middleware");
async function contactsRoutes(fastify) {
    const contactUseCase = new contact_usecase_1.ContactUseCase();
    fastify.addHook("preHandler", auth_middleware_1.authMiddleware);
    // Criar um novo contato
    fastify.post("/", {
        schema: {
            body: {
                type: "object",
                required: ["name", "email", "phone"],
                properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    phone: { type: "string" },
                },
            },
            response: {
                200: {
                    description: "Contato criado com sucesso",
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        phone: { type: "string" },
                    },
                },
            },
        },
    }, async (req, reply) => {
        const { name, email, phone } = req.body;
        const emailUser = req.headers["email"];
        try {
            const data = await contactUseCase.create({
                name,
                email,
                phone,
                userEmail: emailUser,
            });
            return reply.send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
    // Listar todos os contatos
    fastify.get("/", {
        schema: {
            response: {
                200: {
                    description: "Lista de contatos",
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            email: { type: "string" },
                            phone: { type: "string" },
                        },
                    },
                },
            },
        },
    }, async (req, reply) => {
        const emailUser = req.headers["email"];
        try {
            const data = await contactUseCase.listAllContacts(emailUser);
            return reply.send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
    // Atualizar contato
    fastify.put("/:id", {
        schema: {
            body: {
                type: "object",
                required: ["name", "email", "phone"],
                properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    phone: { type: "string" },
                },
            },
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
            },
            response: {
                200: {
                    description: "Contato atualizado com sucesso",
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        phone: { type: "string" },
                    },
                },
            },
        },
    }, async (req, reply) => {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        try {
            const data = await contactUseCase.updateContact({
                id,
                name,
                email,
                phone,
            });
            return reply.send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
    // Deletar contato
    fastify.delete("/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
            },
            response: {
                200: {
                    description: "Contato deletado com sucesso",
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await contactUseCase.delete(id);
            return reply.send({ message: "Contato deletado com sucesso" });
        }
        catch (error) {
            reply.send(error);
        }
    });
}
exports.contactsRoutes = contactsRoutes;
