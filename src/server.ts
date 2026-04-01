import fastify, {type FastifyInstance} from "fastify"

// logger trás algumas insformações de log do sistema, opcional
const app: FastifyInstance = fastify();

app.listen(
    {
        port: 3100,
    },
    () => console.log("Servidor rodando na porta 3100")
);

export default app;