export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    userId?: string; // O campo userId é utilizado para associar o contato a um usuário específico. Ele é necessário para garantir que cada contato esteja vinculado a um usuário válido, permitindo a organização e a gestão adequada dos contatos dentro do sistema.
}

export interface ContactCreate {
    name: string;
    email: string;
    phone: string;
    userEmail: string;
}

export interface ContactCreateData{
    name: string;
    email: string;
    phone: string;
    userId: string;
}

export interface ContactRepository {
    create(contact: ContactCreateData): Promise<Contact>;
    findByEmailOrPhone(email: string, phone: string): Promise<Contact | null>;
    findById(id: string): Promise<Contact | null>;
    findAllContacts(userId: string): Promise<Contact[]>;
    update(id: string, contact: Partial<Contact>): Promise<Contact>;
    // UPDATE DO PROFESSOR
    // updateContact({ id, name, email, phone }: Contact): Promise<Contact>;
    delete(id: string): Promise<boolean>;
}