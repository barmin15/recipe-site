import { RecipeIngredient } from "../data/recipeDatas";

export const isLotOfSugarOrSalt = (ingredient: RecipeIngredient): boolean => {
    //cant contain a lot of sugar or salt
    if (ingredient.ingredientName === ("Só" || "Cukor")) {
        if (ingredient.unitName === ("g" || "csésze") && ingredient.amount < 10) return false;
        return true;
    }
    return false;
}

//TODO
export const isUnhealthy = (): boolean => {
    //fat and sugar can not be in the same food
    return false;
}

export const isNotKosher = (description: string): boolean => {
    //description cant contain kosher or kóser 
    return description.includes("kosher" || "kóser");
}
