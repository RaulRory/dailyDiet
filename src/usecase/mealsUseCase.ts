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
}