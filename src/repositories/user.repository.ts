import type { User, UserRepository, UserCreate } from "../interfaces/user.interface.js";
import { prisma } from "../database/prisma-client.js";
export class UserRepositoryPrisma implements UserRepository {

    async create(data: UserCreate): Promise<User> {
        const result = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
            },
        });
        return result;
         
    }


    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return result;
        
    }


    async  findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }


    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented."); 
    }


    async update(id: string, user: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }


}