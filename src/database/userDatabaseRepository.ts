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
    }
}