import React from "react";
import backgroundImage from "../../../images/food_background.jpg";
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { Recipe } from "../../../data/recipeDatas";
import { request } from "../../../api/fetch";
import { useNavigate } from "react-router";

interface RecipeFormProps {
    setRecipe: React.Dispatch<any>,
    fetchMethod: string,
    fetchEndpoint: string,
    recipe: Recipe
}

export default function RecipeForm({ fetchEndpoint, fetchMethod, recipe, setRecipe }: RecipeFormProps) {
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'ingredients') {
            const ingredientsArray = value.split(',').map(ingredient => ingredient.trim());
            setRecipe({ ...recipe, [name]: ingredientsArray });
        } else {
            setRecipe({ ...recipe, [name]: value });
        }
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        request(fetchMethod, fetchEndpoint, recipe)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setRecipe({
            id: 0,
            name: '',
            description: '',
            preparationSteps: '',
            ingredients: []
        });

        navigate("/");
    };

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Container maxWidth="sm">
                <Box p={4} bgcolor="rgba(255, 255, 255, 0.8)" borderRadius={8}>
                    <Typography variant="h4" gutterBottom align="center">
                        Add New Recipe
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth margin="normal" label="Name" name="name" value={recipe.name} onChange={handleChange} />
                        <TextField fullWidth margin="normal" label="Description" name="description" multiline rows={4} value={recipe.description} onChange={handleChange} />
                        <TextField fullWidth margin="normal" label="Preparation Steps" name="preparationSteps" multiline rows={4} value={recipe.preparationSteps} onChange={handleChange} />
                        <TextField fullWidth margin="normal" label="Ingredients (separated by commas)" name="ingredients" value={recipe.ingredients.join(',')} onChange={handleChange} />
                        <Box mt={2} textAlign="center">
                            <Button variant="contained" color="primary" type="submit">
                                Add Recipe
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container>
        </div>
    );
}

