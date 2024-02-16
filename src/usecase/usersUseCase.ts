import { UserDatabaseRepository } from "../database/userDatabaseRepository.js";
import { User } from "../repository/userRepository.js";

export class UsersUseCase {

    constructor(private usersRepository: UserDatabaseRepository) {
        this.usersRepository = usersRepository;
    }

    async createUser(user: User) {
        await this.usersRepository.createUser(user);
        
    }
}