import { FastifyReply, FastifyRequest } from "fastify";
import { MealsUseCase } from "../usecase/mealsUseCase.js";
import { MealsDatabaseRepository } from "../database/mealsDatabaseRepository.js";
import { PrismaService } from "../database/prismaService.js";
import { z } from "zod";

export class MealsController {
    constructor() {}

    async createMeals(request: FastifyRequest, reply: FastifyReply) {
        try {
            const model = new PrismaService()
            const repository = new MealsDatabaseRepository(model);
            const useCase = new MealsUseCase(repository);
            
            const mealSchema = z.object({
                name: z.string(),
                description: z.string(),
                date: z.date(),
                isOnTheDiet: z.boolean(),
            });
    
            const mealSchemaParse = mealSchema.parse(request.body);
    
            const { userId } = request.cookies;
    
            if (userId) {
                const meal = {
                    ...mealSchemaParse,
                    usersId: userId
                }
    
               const mealCreated = await useCase.createMeals(meal);
    
               reply.status(201).send(mealCreated);
            }

            return reply.status(401).send({ message: "User not Autorizithe"});

        } catch (error) {
            return reply.status(400).send({ error: "there was a failure in the process"});
        }
    }

    async editMeals(request: FastifyRequest, reply: FastifyReply) {
        try {
            const model = new PrismaService()
            const repository = new MealsDatabaseRepository(model);
            const useCase = new MealsUseCase(repository);

            const mealSchema = z.object({
                name: z.string(),
                description: z.string(),
                date: z.date(),
                isOnTheDiet: z.boolean(),
            });

            const idMealsSchema = z.object({
                id: z.string().uuid()
            });
    
            const mealSchemaParse = mealSchema.parse(request.body);
            const { id } = idMealsSchema.parse(request.query);
    
            const { userId } = request.cookies;
    
            if (userId) {
                const meal = {
                    ...mealSchemaParse,
                    usersId: userId
                }
    
               const mealsEdited = await useCase.editMeals(meal, id);
    
               reply.status(201).send(mealsEdited);
            }

        } catch (error) {
            return reply.status(400).send({ error: "there was a failure in the process"});
        }
    }
}