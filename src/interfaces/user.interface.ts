export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreate {
    name: string;
    email: string;
    
}

export interface UserRepository{
    create(user: UserCreate): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    delete(id: string): Promise<void>;
    update(id: string, user: Partial<User>): Promise<User>;
}