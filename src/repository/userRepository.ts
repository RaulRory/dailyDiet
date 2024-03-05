import { z } from 'zod'
import { Meals } from './mealsRepository.js';

const parseSchemaUser = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
});

const parseSchemaUserMetrics = z.object({
    mealsRegistered: z.number(),
    mealsOnDiet: z.number(),
    mealsOffDiet: z.number(),
    bestSequenceOfMealsOnDiet: z.number(),
});

export type UserMetrics = z.infer<typeof parseSchemaUserMetrics>;
export type User = z.infer<typeof parseSchemaUser>;

export interface UsersRepository {
    createUser: (user: User) => Promise<void>;
    emailExists: (email: string) => Promise<boolean>;
    userMetrics: (id: string) => Promise<Meals[]>;
}