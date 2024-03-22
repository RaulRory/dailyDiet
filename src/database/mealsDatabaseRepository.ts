import { Meals, MealsRepository } from "../repository/mealsRepository.js";
import { PrismaService } from "./prismaService.js";


type MealsRemoveId = Omit<Meals, 'id'>;

export class MealsDatabaseRepository implements MealsRepository {
    constructor(private model: PrismaService) {}

    async createMeals(data: Meals): Promise<Meals> {

        const { user, ...result} = await this.model.meals.create({ 
            data: {
                name: data.name,
                description: data.description,
                date: data.date,
                isOnTheDiet: data.isOnTheDiet,
                user: {
                    connect: {
                        id: data.userId
                    }
                },
            },
            include: {
                user: true
            }
        });
        const meal: MealsRemoveId = {
            ...result,
            userId: user.id
        }

        return meal;
    }

}