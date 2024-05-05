import { isDairy, isFat, isMeat, isSugar } from "../data/ingredientTypes";
import { RecipeIngredient } from "../data/recipeDatas";

//no more than 500gramms of sugar or salt can be added
export const isLotOfSugarOrSalt = (ingredientName: string, amount: number, unit: string): boolean => {
    const sugarAndSaltThreshold = 500;

    if (ingredientName.toLowerCase() !== ("só" || "cukor")) return false;

    let amountInGrams = amount;

    switch (unit.toLowerCase()) {
        case "g":
            break;
        case "dkg":
            amountInGrams *= 10;
            break;
        case "teáskanál":
            amountInGrams *= 5;
            break;
        case "kávéskanál":
            amountInGrams *= 3;
            break;
        case "evőkanál":
            amountInGrams *= 15;
            break;
        case "csésze":
            amountInGrams *= 200;
            break;
        case "csipet":
            break;
        default:
            throw new Error("Invalid unit provided");
    }

    return amountInGrams >= sugarAndSaltThreshold;
}

export const isUnhealthy = (includedIngredients: RecipeIngredient[], toBeAddedIngredient: string): boolean => {
    const hasFat = includedIngredients.some(ingredient => isFat(ingredient.ingredientName));

    const hasSugar = includedIngredients.some(ingredient => isSugar(ingredient.ingredientName));

    //if it already contains both, it means we already warned them, so there is no point doing it again
    if(hasFat && hasSugar) return false

    if (hasFat && isSugar(toBeAddedIngredient)) return true;

    if (hasSugar && isFat(toBeAddedIngredient)) return true;

    return false;
}

export const isNotKosher = (description: string, includedIngredients: RecipeIngredient[], toBeaddedIngredient: string): boolean => {
    const containsKosher = description.toLowerCase().includes("kosher") || description.toLowerCase().includes("kóser");

    if (containsKosher) {
        const hasMeat = includedIngredients.some(ingredient => isMeat(ingredient.ingredientName));
        const hasDairy = includedIngredients.some(ingredient => isDairy(ingredient.ingredientName));

        if ((isMeat(toBeaddedIngredient) && hasDairy) || (isDairy(toBeaddedIngredient) && hasMeat)) return true;
    }

    return false;
}
