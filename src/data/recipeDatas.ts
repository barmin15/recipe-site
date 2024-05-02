export interface Recipe {
    id: number;
    name: string;
    description: string;
    preparationSteps: string;
    ingredients: string[];
}

export interface Ingredient {
    id: number;
    name: string;
}

export interface IngredientUnit {
    id: number;
    name: string;
}