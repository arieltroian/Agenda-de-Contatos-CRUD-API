"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserUseCase {
    constructor() {
        this.userRepository = new user_repository_1.UserRepositoryPrisma();
    }
    async create({ name, email }) {
        const verifyIfUserExists = await this.userRepository.findByEmail(email);
        if (verifyIfUserExists) {
            throw new Error("User already exists");
        }
        const result = await this.userRepository.create({ email, name });
        return result;
    }
}
exports.UserUseCase = UserUseCase;
// UseCase: criação dos métodos
