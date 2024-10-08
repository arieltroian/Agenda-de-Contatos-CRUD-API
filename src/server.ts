import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui"; // Separado para Swagger UI
import { userRoutes } from "./routes/user.routes";
import { contactsRoutes } from "./routes/contact.routes";

const app: FastifyInstance = fastify({ logger: true });

// Registro do Swagger (documentação da API)
app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "API Documentation",
      description: "API documentation for users and contacts",
      version: "1.0.0",
    },
    host: "localhost:3100",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

// Registro do Swagger UI (interface gráfica para visualizar a documentação)
app.register(fastifySwaggerUi, {
  routePrefix: "/documentation", // Rota onde a documentação será acessada
  uiConfig: {
    docExpansion: "full", // Exibe a documentação expandida
    deepLinking: false, // Desabilita links profundos
  },
  exposeRoute: true,
});

// Registro das rotas
app.register(userRoutes, {
  prefix: "/users",
});
app.register(contactsRoutes, {
  prefix: "/contacts",
});

// Inicialização do servidor
app.listen(
  {
    port: 3100,
  },
  () => console.log("Servidor rodando na porta 3100")
);
