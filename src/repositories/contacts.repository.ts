import { prisma } from "../database/prisma-client.js"
import type { Contact, ContactCreate, ContactCreateData, ContactRepository } from "../interfaces/contacts.interface.js";

export class ContactRepositoryPrisma implements ContactRepository{
    async create(data: ContactCreateData): Promise<Contact> {
    const result = await prisma.contacts.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                userId: data.userId
            }
        });
        return result;
    }
    async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null> {
        const result = await prisma.contacts.findFirst({
            where: {
                OR: [
                    {email},
                    {phone}
                ]
            }
        });
        return result || null;
    }

    async findById(id: string): Promise<Contact | null> {
        const result = await prisma.contacts.findUnique({
            where: {
                id, 
            }
        });
        return result || null;
    }

    async delete(id: string): Promise<void> {
        await prisma.contacts.delete({
            where: {
                id,
            }
        });
    }   

    async update(id: string, contact: Partial<Contact>): Promise<Contact> {
        const data : any = {};
        if(contact.name) data.name = contact.name;
        if(contact.email) data.email = contact.email;
        if(contact.phone) data.phone = contact.phone;
        const result = await prisma.contacts.update({
            where: {    
                id,
            },
            data,
            
        });
        return result;
    }
}