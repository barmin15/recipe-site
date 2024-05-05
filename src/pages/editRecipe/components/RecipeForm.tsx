import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { getRequest, request } from '../../../logic/fetch';
import { Ingredient, IngredientUnit, Recipe } from '../../../data/recipeDatas';
import { useNavigate } from 'react-router';

import IngredientListSection from './ingredient/IngredientListSection';
import FormFieldsSection from './form/FormFieldSection';
import IngredientSelectionSection from './ingredient/IngredientSelectionSection';

interface RecipeFormProps {
  setRecipe: React.Dispatch<React.SetStateAction<Recipe>>;
  fetchMethod: string;
  fetchEndpoint: string;
  recipe: Recipe;
}

export default function RecipeForm({ fetchEndpoint, fetchMethod, recipe, setRecipe }: RecipeFormProps) {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientUnits, setIngredientUnits] = useState<IngredientUnit[]>([]);

  useEffect(() => {
    const fetchEndpoints: { endpoint: string; setter: (data: any) => void; }[] = [
      { endpoint: '/ingredient-units/', setter: setIngredientUnits },
      { endpoint: '/ingredients/', setter: setIngredients }
    ];

    fetchEndpoints.forEach(fetch => {
      getRequest(fetch.endpoint)
        .then((res) => fetch.setter(res))
        .catch((err) => console.log(err));
    })
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      recipe.name.trim() !== '' &&
      recipe.description.trim() !== '' &&
      recipe.preparationSteps.trim() !== ''
    ) {
      request(fetchMethod, fetchEndpoint, recipe)
        .then(() => navigate('/'))
        .catch(() => navigate('/'));
    }
  };

  return (
    <Container maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '4%' }}>
      <Box p={2} bgcolor="rgba(255, 255, 255, 0.9)" borderRadius={4}>
        <Typography variant="h6" gutterBottom align="center">Készíts receptet</Typography>
        <form onSubmit={handleSubmit}>
          <FormFieldsSection recipe={recipe} setRecipe={setRecipe} />
          <Typography sx={{paddingTop:2}}>Válassz hozzávalókat a recepthez:</Typography>
          <IngredientSelectionSection
            ingredients={ingredients}
            ingredientUnits={ingredientUnits}
            setRecipe={setRecipe}
            recipe={recipe}
          />
          <IngredientListSection setRecipe={setRecipe} recipe={recipe} />
          <Box mt={2} textAlign="center">
            <Button variant="contained" color="primary" type="submit">
              Kész
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
