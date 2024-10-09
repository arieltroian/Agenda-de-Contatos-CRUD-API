"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryPrisma = void 0;
const prisma_client_1 = require("../database/prisma-client");
class UserRepositoryPrisma {
    async create(data) {
        const result = await prisma_client_1.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
            },
        });
        return result;
    }
    async findByEmail(email) {
        const result = await prisma_client_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        return result || null;
    }
}
exports.UserRepositoryPrisma = UserRepositoryPrisma;
