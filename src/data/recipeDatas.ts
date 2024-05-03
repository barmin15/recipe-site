export interface Recipe {
    id: number;
    name: string;
    description: string;
    preparationSteps: string;
    ingredients: {
        id: number;
        ingredientId: number;
        ingredientName: string;
        amount: number;
        unitId: number;
        unitName: string;
    }[];
}

export interface Ingredient {
    id: number;
    name: string;
}

export interface IngredientUnit {
    id: number;
    name: string;
}