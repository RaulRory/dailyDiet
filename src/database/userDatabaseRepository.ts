import { User, UsersRepository } from "../repository/userRepository.js";
import { PrismaService } from "./prismaService.js";

export class UserDatabaseRepository implements UsersRepository {
    constructor(private model: PrismaService) {}

    async createUser(user: User) {
        await this.model.users.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

        return;
    }

    async emailExists(email: string) {
        const user = await this.model.users.findUnique({
            where: {
                email: email,
            },
        });

        return user !== null;
    }

    async userIdExists(id: string) {
        const user = await this.model.users.findUnique({
            where: {
                id: id,
            },
        });

        return user !== null;
    }

    async userMetrics(id: string) {
        const meals = await this.model.meals.findMany({
            where: {
                usersId: id,
            },
        });

        return meals;
    }
}