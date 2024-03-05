import { Meals } from "../repository/mealsRepository.js";

export function findDateWithMostDiet(data: Meals[] ) {
    let maxCount = 0;
  
    const dateCounts: Map<number, number> = new Map();
  
    data.forEach(item => {
      const dateKey = item.date.getTime();
      const currentCount = dateCounts.get(dateKey) || 0;
      dateCounts.set(dateKey, item.isOnTheDiet ? currentCount + 1 : currentCount);
  
      if (dateCounts.get(dateKey)! > maxCount) {
        maxCount = dateCounts.get(dateKey)!;
      }
    
    });
  
    return maxCount;
}