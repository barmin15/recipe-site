import { useEffect, useState } from "react";
import { getRequest } from "../../../logic/fetch";
import { Recipe } from "../../../data/recipeDatas";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

interface OpenRecipeProp {
    id: number;
}

export default function OpenRecipe({ id }: OpenRecipeProp) {
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
    }, [id]);

    return (
        <>
            <Typography variant="h4" gutterBottom>
                {recipe.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Leírás:</strong> {recipe.description}
            </Typography>

            <Typography variant="body1" gutterBottom>
                <strong>Elkészítési lépések:</strong> {recipe.preparationSteps}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Hozzávalók:</strong>
            </Typography>
            <List>
                {recipe.ingredients.map((ingredient, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${ingredient.amount} ${ingredient.unitName} ${ingredient.ingredientName}`} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}
