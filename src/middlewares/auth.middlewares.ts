import {type FastifyReply, type FastifyRequest} from "fastify";
import { UserRepositoryPrisma } from "../repositories/user.repository.js";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const email = request.headers['email'] as string | undefined;
    if (!email) {
        return reply.status(401).send({message: "Unauthorized : No Email Provided"});
    }

    const userRepository = new UserRepositoryPrisma();
    const user = await userRepository.findByEmail(email);

    if (!user) {
        return reply.status(401).send({message: "Unauthorized"});
    }
}