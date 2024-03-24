import { Meals, MealsRepository } from "../repository/mealsRepository.js";
import { PrismaService } from "./prismaService.js";

export class MealsDatabaseRepository implements MealsRepository {
    constructor(private model: PrismaService) {}

    async createMeals(data: Meals): Promise<Meals> {

        const meal = await this.model.meals.create({ 
            data: {
                name: data.name,
                description: data.description,
                date: data.date,
                isOnTheDiet: data.isOnTheDiet,
                user: {
                    connect: {
                        id: data.usersId
                    }
                },
            }
        });

        return meal;
    }

}