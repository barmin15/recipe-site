import React from "react";
import backgroundImage from "../images/food_background.jpg";

import { TextField, Button, Typography, Box, Container } from '@mui/material';

interface RecipeFormProps {
    handleSubmit: (e: React.FormEvent) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    recipe: {
        id: number;
        name: string;
        description: string;
        preparationSteps: string;
        ingredients: string[];
    };
}

export default function RecipeForm({ handleSubmit, handleChange, recipe}: RecipeFormProps) {
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

