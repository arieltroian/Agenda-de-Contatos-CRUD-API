import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact.usecase";
import { Contact, ContactCreate } from "../interfaces/contacts.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactsRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUseCase();
  fastify.addHook("preHandler", authMiddleware);

  // Criar um novo contato
  fastify.post<{ Body: ContactCreate }>(
    "/",
    {
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
    },
    async (req, reply) => {
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
      } catch (error) {
        reply.send(error);
      }
    }
  );

  // Listar todos os contatos
  fastify.get(
    "/",
    {
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
    },
    async (req, reply) => {
      const emailUser = req.headers["email"];
      try {
        const data = await contactUseCase.listAllContacts(emailUser);
        return reply.send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  // Atualizar contato
  fastify.put<{ Body: Contact; Params: { id: string } }>(
    "/:id",
    {
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
    },
    async (req, reply) => {
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
      } catch (error) {
        reply.send(error);
      }
    }
  );

  // Deletar contato
  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    {
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
    },
    async (req, reply) => {
      const { id } = req.params;
      try {
        const data = await contactUseCase.delete(id);
        return reply.send({ message: "Contato deletado com sucesso" });
      } catch (error) {
        reply.send(error);
      }
    }
  );
}
