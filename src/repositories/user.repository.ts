import type { User, UserRepository, UserCreate } from "../interfaces/user.interface.js";

class UserRepositoryPrisma implements UserRepository {

    async create(user: UserCreate): Promise<User> {
        throw new Error("Method not implemented."); 
    }


    async findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented."); 
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