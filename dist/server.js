"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui")); // Separado para Swagger UI
const user_routes_1 = require("./routes/user.routes");
const contact_routes_1 = require("./routes/contact.routes");
const app = (0, fastify_1.default)({ logger: true });
// Registro do Swagger (documentação da API)
app.register(swagger_1.default, {
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
app.register(swagger_ui_1.default, {
    routePrefix: "/documentation", // Rota onde a documentação será acessada
    uiConfig: {
        docExpansion: "full", // Exibe a documentação expandida
        deepLinking: false, // Desabilita links profundos
    },
});
// Registro das rotas
app.register(user_routes_1.userRoutes, {
    prefix: "/users",
});
app.register(contact_routes_1.contactsRoutes, {
    prefix: "/contacts",
});
// Inicialização do servidor
app.listen({
    port: 3100,
}, () => console.log("Servidor rodando na porta 3100"));
