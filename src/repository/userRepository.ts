import { z } from 'zod'

const parseSchemaUser = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
});

export type User = z.infer<typeof parseSchemaUser>;

export interface UsersRepository {
    createUser: (user: User) => Promise<void>;
}