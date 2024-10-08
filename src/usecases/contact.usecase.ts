import {
  Contact,
  ContactCreate,
  ContactRepository,
} from "../interfaces/contacts.interface";
import { ContactsRepositoryPrisma } from "../repositories/contacts.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class ContactUseCase {
  private contactRepository: ContactRepository;
  private userRepository: UserRepositoryPrisma;

  constructor() {
    this.contactRepository = new ContactsRepositoryPrisma();
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({ email, name, phone, userEmail }: ContactCreate) {
    // email do usuário logado
    // buscar o usuário pelo email
    // se não existir, retornar erro
    // se existir, criar contato
    // antes de criar o contato, validar se ele já existe pelo telefone ou email

    const user = await this.userRepository.findByEmail(userEmail);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const verifyIfExistsContact =
      await this.contactRepository.findByEmailOrPhone(email, phone);

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

  async listAllContacts(userEmail: any) {
    const user = await this.userRepository.findByEmail(userEmail);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const contacts = await this.contactRepository.findAllContacts(user.id);

    return contacts;
  }

  async updateContact({ id, name, email, phone }: Contact) {
    const data = await this.contactRepository.updateContact({
      id,
      name,
      email,
      phone,
    });

    return data;
  }

  async delete(id: string) {
    const data = await this.contactRepository.delete(id);

    return data;
  }
}

export { ContactUseCase };

// UseCase: criação dos métodos
