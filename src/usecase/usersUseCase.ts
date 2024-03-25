import { UserDatabaseRepository } from "../database/userDatabaseRepository.js";
import { User, UserMetrics } from "../repository/userRepository.js";
import { findDateWithMostDiet } from "../utils/findDateWithDiet.js";

export class UsersUseCase {

    constructor(private usersRepository: UserDatabaseRepository) {
        this.usersRepository = usersRepository;
    }

    async createUser(user: User) {
        const emailExists = await this.usersRepository.emailExists(user.email);
        
        if (emailExists) {
            throw new Error('Email already exists!');
        }

        await this.usersRepository.createUser(user);
    }

    async usersExists(id: string) {
        const userIdExists = await this.usersRepository.userIdExists(id);

        if (!userIdExists) {
            throw new Error('User id not exists!');
        }

        return userIdExists
    }

    async userMetrics(id: string) {
        const meals = await this.usersRepository.userMetrics(id);

        if (!meals) {
            throw new Error('User not found!');
        }

        console.log(meals);
        const userMetrics: UserMetrics = 
             {
                mealsRegistered: meals.length,
                mealsOnDiet: meals.filter((meal) => meal.isOnTheDiet).length,
                mealsOffDiet: meals.filter((meal) => !meal.isOnTheDiet).length,
                bestSequenceOfMealsOnDiet: findDateWithMostDiet(meals)
            }
        
        return userMetrics;
    }
}