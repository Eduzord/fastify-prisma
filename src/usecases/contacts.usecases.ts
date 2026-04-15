import type { Contact, ContactCreate, ContactRepository } from "../interfaces/contacts.interface.js";
import type { UserRepository } from "../interfaces/user.interface.js";

export class ContactUseCase {
    private contactRepository: ContactRepository;
    private userRepository: UserRepository;

    constructor(contactRepository: ContactRepository, userRepository: UserRepository) {
        this.contactRepository = contactRepository;
        this.userRepository = userRepository;
    }

    async create({name, email, phone, userEmail}: ContactCreate): Promise<Contact> {
        // 1. Validar se o usuário existe
        const user = await this.userRepository.findByEmail(userEmail);

        if (!user) {
            throw new Error("User not found");
        }

        // 2. Verificar se já existe um contato com o mesmo email ou telefone
        const existingContact = await this.contactRepository.findByEmailOrPhone(email, phone);

        if (existingContact) {
            throw new Error("Contact with the same email or phone already exists");
        }

        // 3. Criar o contato usando o repositório de contatos
        // O método create do repositório é chamado para criar o contato no banco de dados ou em qualquer outra fonte de dados. O resultado é retornado como um objeto do tipo Contact, que representa o contato criado.
        const result = await this.contactRepository.create({
            name,
            email,
            phone,
            userId: user.id, // Assumindo que o usuário tem um campo id
        });

        return result;
    }

    async listAllContacts(userEmail: string): Promise<Contact[]> {
        // 1. Validar se o usuário (dono dos contatos) existe
        const user = await this.userRepository.findByEmail(userEmail);

        if (!user) {
            throw new Error("User not found");
        }

        // 2. Buscar os contatos associados ao usuário
        const contacts = await this.contactRepository.findAllContacts(user.id);

        return contacts


}

async update(id: string, contact: Partial<Contact>): Promise<Contact> {
    const existingContact = await this.contactRepository.findById(id);

    if (!existingContact) {
        throw new Error("Contact not found");
    }

    const data = {
        name: existingContact.name ,
        email: existingContact.email,
        phone: existingContact.phone,
    }

    const updatedContact = await this.contactRepository.update(id, data);

    return updatedContact;

}

async delete(id: string): Promise<boolean> {
    const existingContact = await this.contactRepository.findById(id);

    if (!existingContact) {
        throw new Error("Contact not found");
    }

    const result = await this.contactRepository.delete(id);

    if (!result) {
        throw new Error("Failed to delete contact");
    }

    return true;

}

}
