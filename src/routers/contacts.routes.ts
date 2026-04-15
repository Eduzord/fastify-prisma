import type { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contacts.usecases.js";
import { ContactRepositoryPrisma } from "../repositories/contacts.repository.js";
import type { ContactCreate } from "../interfaces/contacts.interface.js";
import { UserRepositoryPrisma } from "../repositories/user.repository.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

export async function contactRoutes(fastify: FastifyInstance) {
    const contactRepository = new ContactRepositoryPrisma();
    const userRepository = new UserRepositoryPrisma();
    const contactUseCase = new ContactUseCase(contactRepository,userRepository);

    // Adiciona o middleware de autenticação para todas as rotas de contatos
    // O middleware authMiddleware é adicionado como um hook 'preHandler' para todas as rotas definidas dentro desta função. Isso significa que antes de qualquer rota ser processada, o middleware será executado para verificar a autenticação do usuário com base no e-mail fornecido no cabeçalho da requisição.
    // O middleware authMiddleware é responsável por verificar se o e-mail fornecido no cabeçalho 'email' pertence a um usuário válido no banco de dados. Se o e-mail não for fornecido ou se o usuário não for encontrado, o middleware retorna uma resposta de erro 401 (Unauthorized) e impede que a rota seja processada.
    // O uso do middleware de autenticação é uma prática comum para proteger rotas que exigem autenticação, garantindo que apenas usuários autorizados possam acessar os recursos protegidos.

    fastify.addHook('preHandler', authMiddleware);

    fastify.post<{ Body: ContactCreate}>("/", async (request, reply) => {
        const {name, email, phone} = request.body;
        const userEmail = request.headers['email'] as string;

        try {
            const data = await contactUseCase.create({
                name,
                email,
                phone,
                userEmail
            });
            return reply.status(201).send(data);
        } catch (error) {
            return reply.status(400).send({message: error instanceof Error ? error.message : "Unexpected error"});
            }
        });

        fastify.get("/", async (request, reply) => {
            const userEmail = request.headers['email'] as string;

            try{
                const data = await contactUseCase.listAllContacts(userEmail);
                return reply.send(data);
            } catch (error) {
                return reply.status(400).send({message: error instanceof Error ? error.message : "Unexpected error"});
            }
        });

        fastify.put("/:id", async (request, reply) => {
            const { id } = request.params as { id: string };
            const { name, email, phone } = request.body as Partial<ContactCreate>;
            const userEmail = request.headers['email'] as string;

            try{
                const updateData = Object.fromEntries(
                    Object.entries({name, email, phone}).filter(([_, v]) => v !== undefined)
                );
                const updatedContact = await contactUseCase.update(id, updateData as Partial<ContactCreate>);
                return reply.send(updatedContact);
            } catch (error) {
                return reply.status(400).send({message: error instanceof Error ? error.message : "Unexpected error"});
            }

        })

        fastify.delete("/:id", async (request, reply) => {
            const { id } = request.params as { id: string };

            try {
                const result =await contactUseCase.delete(id);
                return reply.status(200).send({ message: "Contact deleted successfully", result: result });
            } catch (error) {
                return reply.status(400).send({ message: error instanceof Error ? error.message : "Unexpected error" });
            }
        });
        
    }