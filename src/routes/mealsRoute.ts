import { FastifyInstance } from "fastify";
import { MealsController } from "../controller/mealsController.js";

export async function mealsRoutes (fastify: FastifyInstance) {
    const mealsController = new MealsController()
    
    fastify.post("/create", mealsController.createMeals)
    fastify.put("/edit/:id", mealsController.editMeals)
    fastify.delete("/delete/:id", mealsController.deleteMeals)
    fastify.get("/list", mealsController.listMeals)
    fastify.get("/list/:id", mealsController.listMealById)
}