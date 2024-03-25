import { z } from "zod";

const parseSchemaMeal = z.object({
    name: z.string(),
    description: z.string(),
    date: z.date(),
    isOnTheDiet: z.boolean(),
    usersId: z.string().uuid(),
});

export type Meals = z.infer<typeof parseSchemaMeal>;

export interface MealsRepository {
    createMeals(data: Meals): Promise<Meals>
    updateMeals(dataToUpdate: Meals, id: string): Promise<Meals>
    deleteMeals(id: string): Promise<void>
}