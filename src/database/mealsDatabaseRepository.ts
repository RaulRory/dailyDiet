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

    async updateMeals(dataToUpdate: Meals, id: string): Promise<Meals> {
        const meal = await this.model.meals.update({
            data: {
                ...dataToUpdate
            },
            where: {
                id: id
            }
        });

        return meal;
    }

    async deleteMeals(id: string): Promise<void> {
        await this.model.meals.delete({
            where: {
                id: id
            }
        });

        return;
    }
}