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
        
            return reply.status(201).send();
        } catch (error) {
            console.error(error);
            return reply.status(400).send({ error: "there was a failure in the process"});
        }

    }
}