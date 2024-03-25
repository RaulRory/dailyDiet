import { FastifyReply, FastifyRequest } from "fastify";
import { UsersUseCase } from "../usecase/usersUseCase.js";
import { z } from "zod";
import { UserDatabaseRepository } from "../database/userDatabaseRepository.js";
import { PrismaService } from "../database/prismaService.js";
import { randomUUID } from "node:crypto";

export class UsersController {
    constructor() {}

    async createUser(request: FastifyRequest, reply: FastifyReply) {
        try {
            const prismaService = new PrismaService();
            const repository = new UserDatabaseRepository(prismaService);
            const usersUseCase = new UsersUseCase(repository);

            const userSchema = z.object({
                id: z.string().uuid().default(randomUUID()),
                name: z.string(),
                email: z.string().email(),
            });

            const user = userSchema.parse(request.body);

            await usersUseCase.createUser(user);

            reply.cookie("userId", user.id, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
                httpOnly: true,
                signed: true,
            });

            return reply.status(201).send();
        } catch (error) {
            console.error(error);
            return reply.status(400).send({ error });
        }

    }

    async userMetrics(request: FastifyRequest, reply: FastifyReply) {
        try {

            const { userId } = request.cookies
            const prismaService = new PrismaService();
            const repository = new UserDatabaseRepository(prismaService);
            const usersUseCase = new UsersUseCase(repository);
            
            const schemasUserParameters = z.object({
                id: z.string().uuid()
            });

            const { id } = schemasUserParameters.parse(request.params);

            if (userId) {
                const userIdExists = await usersUseCase.usersExists(id);

                if (userIdExists) {
                    const metricsUsers = await usersUseCase.userMetrics(id);
                    return reply.status(200).send(metricsUsers);
                }
            }

            return reply.status(401).send({ message: "User not authorized" });
            

        } catch (error) {
            console.error(error);
            return reply.status(400).send({ error });      
        }
    }
}