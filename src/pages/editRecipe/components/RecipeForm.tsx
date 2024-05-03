import React, { useEffect, useState } from 'react';
import backgroundImage from '../../../images/food_background.jpg';
import { Box, Container, Typography, Button } from '@mui/material';
import { getRequest, request } from '../../../api/fetch';
import { Ingredient, IngredientUnit, Recipe } from '../../../data/recipeDatas';
import { useNavigate } from 'react-router';

import IngredientListSection from './IngredientListSection';
import FormFieldsSection from './FormFieldSection';
import IngredientSelectionSection from './IngredientSelectionSection';

interface RecipeFormProps {
  setRecipe: React.Dispatch<any>;
  fetchMethod: string;
  fetchEndpoint: string;
  recipe: Recipe;
}

export default function RecipeForm({ fetchEndpoint, fetchMethod, recipe, setRecipe }: RecipeFormProps) {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientUnits, setIngredientUnits] = useState<IngredientUnit[]>([]);

  useEffect(() => {
    getRequest('/ingredient-units/')
      .then((res) => setIngredientUnits(res))
      .catch((err) => console.log(err));

    getRequest('/ingredients/')
      .then((res) => setIngredients(res))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    request(fetchMethod, fetchEndpoint, recipe)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate('/');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Box p={2} bgcolor="rgba(255, 255, 255, 0.9)" borderRadius={8}>
          <Typography variant="h5" gutterBottom align="center">
            Add New Recipe
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormFieldsSection recipe={recipe} handleChange={handleChange} />
            <IngredientSelectionSection
              ingredients={ingredients}
              ingredientUnits={ingredientUnits}
              setRecipe={setRecipe}
              recipe={recipe}
            />
            <IngredientListSection recipe={recipe} />
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
