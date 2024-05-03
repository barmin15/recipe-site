export interface Recipe {
    id: number;
    name: string;
    description: string;
    preparationSteps: string;
    ingredients: RecipeIngredient[];
}

export interface Ingredient {
    id: number;
    name: string;
}

export interface IngredientUnit {
    id: number;
    name: string;
}

export interface RecipeIngredient {
    id: number;
    ingredientId: number;
    ingredientName: string;
    amount: number;
    unitId: number;
    unitName: string;
}