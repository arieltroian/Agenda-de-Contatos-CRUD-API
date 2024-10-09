"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUseCase = void 0;
const contacts_repository_1 = require("../repositories/contacts.repository");
const user_repository_1 = require("../repositories/user.repository");
class ContactUseCase {
    constructor() {
        this.contactRepository = new contacts_repository_1.ContactsRepositoryPrisma();
        this.userRepository = new user_repository_1.UserRepositoryPrisma();
    }
    async create({ email, name, phone, userEmail }) {
        // email do usuário logado
        // buscar o usuário pelo email
        // se não existir, retornar erro
        // se existir, criar contato
        // antes de criar o contato, validar se ele já existe pelo telefone ou email
        const user = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        const verifyIfExistsContact = await this.contactRepository.findByEmailOrPhone(email, phone);
        if (verifyIfExistsContact) {
            throw new Error("O contato já existe");
        }
        const contact = await this.contactRepository.create({
            email,
            name,
            phone,
            userId: user.id,
        });
        return contact;
    }
    async listAllContacts(userEmail) {
        const user = await this.userRepository.findByEmail(userEmail);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        const contacts = await this.contactRepository.findAllContacts(user.id);
        return contacts;
    }
    async updateContact({ id, name, email, phone }) {
        const data = await this.contactRepository.updateContact({
            id,
            name,
            email,
            phone,
        });
        return data;
    }
    async delete(id) {
        const data = await this.contactRepository.delete(id);
        return data;
    }
}
exports.ContactUseCase = ContactUseCase;
// UseCase: criação dos métodos
