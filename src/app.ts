import fastify from "fastify";
import cookie from "@fastify/cookie";
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

app.register(cookie, {
    secret: "my-secret",
    hook: "onRequest",
});

app.register(usersRoute, { prefix: "/users" });


export { app };