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
                date: z.coerce.date(),
                isOnTheDiet: z.boolean(),
            });
    
            const mealSchemaParse = mealSchema.parse(request.body);
    
            const { userId } = request.cookies;
            
    
            if (userId) {

                const [id] = userId.split(".");

                const meal = {
                    ...mealSchemaParse,
                    usersId: id
                }
    
               const mealCreated = await useCase.createMeals(meal);
    
               return reply.status(201).send(mealCreated);
            }

            return reply.status(401).send({ message: "User not Autorizithe"});

        } catch (error) {
            console.error(error);
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
                date: z.coerce.date(),
                isOnTheDiet: z.boolean(),
            });

            const idMealsSchema = z.object({
                id: z.string().uuid()
            });
    
            const mealSchemaParse = mealSchema.parse(request.body);
            const { id } = idMealsSchema.parse(request.params);
    
            const { userId } = request.cookies;
    
            if (userId) {
                const [usersId] = userId.split(".");

                const meal = {
                    ...mealSchemaParse,
                    usersId
                }
    
               const mealsEdited = await useCase.editMeals(meal, id);
    
               return reply.status(201).send(mealsEdited);
            }

        } catch (error) {
            console.error(error);
            return reply.status(400).send({ error: "there was a failure in the process"});
        }
    }

    async deleteMeals(request: FastifyRequest, reply: FastifyReply) {
        try {
            const model = new PrismaService()
            const repository = new MealsDatabaseRepository(model);
            const useCase = new MealsUseCase(repository);

            const idMealsSchema = z.object({
                id: z.string().uuid()
            });
    
            const { id } = idMealsSchema.parse(request.params);
    
            const { userId } = request.cookies;
    
            if (userId) {
               await useCase.deleteMeals(id);
    
               return reply.status(204).send({ message: "Meal deleted"});
            }

        } catch (error) {
            console.error(error);
            return reply.status(400).send({ error: "there was a failure in the process"});
        }
    }

    async listMeals(request: FastifyRequest, reply: FastifyReply) {
        try {
            const model = new PrismaService()
            const repository = new MealsDatabaseRepository(model);
            const useCase = new MealsUseCase(repository);
    
            const { userId } = request.cookies;
    
            if (userId) {
                const [usersId] = userId.split(".");
               const meals = await useCase.listMeals(usersId);
    
               return reply.status(200).send(meals);
            }

        } catch (error) {
            console.error(error);
            return reply.status(400).send({ error: "there was a failure in the process"});
        }
    }

    async listMealById(request: FastifyRequest, reply: FastifyReply) {
        try {
            const model = new PrismaService()
            const repository = new MealsDatabaseRepository(model);
            const useCase = new MealsUseCase(repository);

            const idMealsSchema = z.object({
                id: z.string().uuid()
            });
    
            const { id } = idMealsSchema.parse(request.params);
    
            const { userId } = request.cookies;
    
            if (userId) {
               const meal = await useCase.listMealById(id);
    
               return reply.status(200).send(meal);
            }

        } catch (error) {
            console.error(error);
            return reply.status(400).send({ error: "there was a failure in the process"});
        }
    }
}