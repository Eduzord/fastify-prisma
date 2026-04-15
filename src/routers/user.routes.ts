import type { FastifyInstance } from "fastify";
import {UserUseCase} from "../usecases/user.usecases.js";
import { UserRepositoryPrisma } from "../repositories/user.repository.js";
import {type UserCreate } from "../interfaces/user.interface.js";

export async function userRoutes(fastify: FastifyInstance) {
    const userRepository = new UserRepositoryPrisma();
    const userUseCase = new UserUseCase(userRepository);

    fastify.post<{Body: UserCreate}>("/", async (request, reply) => {
        const {name, email} = request.body;
        try {
            const data = await userUseCase.create({name, email});
            return reply.status(201).send(data);
        } catch (error) {
            return reply.status(400).send({message: error instanceof Error ? error.message : "Unexpected error"});
        }
    });

fastify.get("/", async (request, reply) => {
    try {
        const data = await userUseCase.listAllUsers();
        return reply.send(data);
    } catch (error) {
        return reply.status(400).send({ message: error instanceof Error ? error.message : "Unexpected error" });
    }
});

fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await userRepository.findById(id);

    if (!user) {
        return reply.status(404).send({ message: "User not found" });
    }

    await userRepository.delete(id);
    return reply.status(200).send({ message: "User deleted successfully" });

});

}