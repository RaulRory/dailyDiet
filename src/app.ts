import fastify from "fastify";

const configPrettyPrint =  {
    develpment: {
        transport: {
            target: 'pino-pretty',
            option: {
                translateTime: true,
                colorize: true,
                ignore: 'pid,hostname,reqId,responseTime,req,res',
            },
        },
    },
    production: true,
}

const app = fastify({
    logger: configPrettyPrint["develpment"]
});



export { app };