import { FastifyInstance } from "fastify";
import { MealsController } from "../controller/mealsController.js";

export async function mealsRoutes (fastify: FastifyInstance) {
    const mealsController = new MealsController()
    
    fastify.post("/create", mealsController.createMeals)
}