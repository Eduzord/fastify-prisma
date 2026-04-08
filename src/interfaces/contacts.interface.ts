export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
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
    delete(id: string): Promise<void>;
    update(id: string, contact: Partial<Contact>): Promise<Contact>;
}