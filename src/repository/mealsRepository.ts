import { z } from "zod";

const parseSchemaMeal = z.object({
    name: z.string(),
    description: z.string(),
    date: z.date(),
    isOnTheDiet: z.boolean()
});

export type Meals = z.infer<typeof parseSchemaMeal>;
