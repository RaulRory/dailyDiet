import fastify from "fastify";
import { usersRoute } from "./routes/usersRoute.js";

const configPrettyPrint =  {
    develpment: {
        transport: {
            target: 'pino-pretty',
            option: {
                translateTime: true,
                colorize: true,
                ignore: 'pid, hostname, reqId, responseTime, req, res',
            },
        },
    },
    production: true,
}

const app = fastify({
    logger: configPrettyPrint["develpment"]
});

app.register(usersRoute, { prefix: "/users" });


export { app };