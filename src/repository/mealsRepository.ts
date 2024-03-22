import { z } from "zod";

const parseSchemaMeal = z.object({
    name: z.string(),
    description: z.string(),
    date: z.date(),
    isOnTheDiet: z.boolean(),
    userId: z.string().uuid(),
});

export type Meals = z.infer<typeof parseSchemaMeal>;

export interface MealsRepository {
    createMeals(data: Meals): Promise<Meals>
}