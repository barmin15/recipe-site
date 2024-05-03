import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getRequest } from "../../logic/fetch";
import RecipeForm from "./components/RecipeForm";
import { Recipe } from "../../data/recipeDatas";

export default function EditRecipe() {
    let { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe>({
        id: 0,
        name: '',
        description: '',
        preparationSteps: '',
        ingredients: []
      });

    useEffect(() => {
        getRequest(`/recipes/${id}`)
            .then(res => setRecipe(res))
            .catch(err => console.log(err));
    }, []);

    return (
        <RecipeForm fetchEndpoint={`/recipes/{id}`} fetchMethod="PUT" setRecipe={setRecipe} recipe={recipe} />
    )
}