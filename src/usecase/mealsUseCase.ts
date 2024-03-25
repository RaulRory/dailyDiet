import { Meals, MealsRepository } from "../repository/mealsRepository.js";

export class MealsUseCase {
    
    constructor(private mealsRepository: MealsRepository) {
        this.mealsRepository = mealsRepository;
    };

    async createMeals(meal: Meals) {
        const newMeal = await this.mealsRepository.createMeals(meal);

        return newMeal;
    }

    async editMeals(dataToUpdate: Meals, id: string) {
        const mealUpdated = await this.mealsRepository.updateMeals(dataToUpdate, id);

        return mealUpdated;
    }

    async deleteMeals(id: string) {
        await this.mealsRepository.deleteMeals(id);

        return;
    }

    async listMeals(id: string) {
        const meals = await this.mealsRepository.listMeals(id);

        return meals;
    }

    async listMealById(id: string) {
        const meal = await this.mealsRepository.listMealById(id);

        if (!meal) {
            throw new Error("Meal not found");
        }
        
        return meal;
    }
}