import { useState, useEffect } from "react";
import { getRequest } from "../../api/fetch";

import {Recipe} from '../../data/recipeDatas';

//components
import RecipeList from "./components/RecipeList";

export default function HomePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        getRequest("/recipes/")
            .then(res => {
                setRecipes(res);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
            });
    }, []);

    return (
        <>
            {recipes.map(recipe => (
                <RecipeList key={recipe.id} recipe={recipe} />
            ))}
        </>
    );
}
