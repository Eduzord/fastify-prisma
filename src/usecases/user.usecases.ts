import {type User, type UserCreate,type UserRepository} from "../interfaces/user.interface.js";

export class UserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async create({name, email}: UserCreate): Promise<User> {
        const verifyUserExists = await this.userRepository.findByEmail(email);
        if (verifyUserExists) {
            throw new Error("User already exists");
        }
        const result = await this.userRepository.create({name, email});
        return result;
    }

}