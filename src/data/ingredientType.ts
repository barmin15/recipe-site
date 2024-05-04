export const isMeat = (ingredientName: string): boolean => {
    const meatIngredients = ["hús", "sertéshús", "csirkehús", "marhahús", "pulykahús"];
    return meatIngredients.includes(ingredientName.toLowerCase());
};

export const isDairy = (ingredientName: string): boolean => {
    const dairyIngredients = ["tej", "tejföl", "sajt", "vaj", "túró"];
    return dairyIngredients.includes(ingredientName.toLowerCase());
};

export const isFat = (ingredientName: string): boolean => {
    const fatIngredients = ["zsír", "olaj", "vaj"];
    return fatIngredients.includes(ingredientName.toLowerCase());
};

export const isSugar = (ingredientName: string): boolean => {
    const sugarIngredients = ["cukor", "méz", "édesítőszer"];
    return sugarIngredients.includes(ingredientName.toLowerCase());
};