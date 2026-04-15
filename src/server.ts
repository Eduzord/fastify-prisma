import fastify, {type FastifyInstance} from "fastify"
import 'dotenv/config';
import { userRoutes } from "./routers/user.routes.js";
import { contactRoutes } from "./routers/contacts.routes.js";

// logger trás algumas insformações de log do sistema, opcional
const app: FastifyInstance = fastify();

app.register(userRoutes, {prefix: "/users"});

app.register(contactRoutes, {prefix: "/contacts"});

app.listen(
    {
        port: 3100,
    },
    () => console.log("Servidor rodando na porta 3100")
);

export default app;