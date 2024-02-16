import { UserDatabaseRepository } from "../database/userDatabaseRepository.js";
import { User } from "../repository/userRepository.js";

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
}