export const isLotOfSugarOrSalt = (ingredientName: string, amount: number, unit: string): boolean => {
    //cant contain a lot of sugar or salt
    if (ingredientName === ("Só" || "Cukor")) {
        if (unit === ("g" || "csésze") && amount < 10) return false;
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
