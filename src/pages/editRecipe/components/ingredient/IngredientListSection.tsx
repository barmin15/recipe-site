import React from 'react';
import { Typography, Box, IconButton, ListItem, ListItemText, Divider } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Recipe } from '../../../../data/recipeDatas';

interface IngredientListSectionProps {
  setRecipe: React.Dispatch<any>;
  recipe: Recipe;
}

export default function IngredientListSection({ recipe, setRecipe }: IngredientListSectionProps) {
  const handleDeleteIngredient = (index: number) => {
    const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        Hozzávalók:
      </Typography>
      {recipe.ingredients.map((ingredient, index) => (
        <Box key={index}>
          <ListItem>
              <IconButton aria-label="delete" onClick={() => handleDeleteIngredient(index)}>
                <Delete sx={{ '&:hover': { color: 'black' } }} />
              </IconButton>
            <ListItemText primary={`${ingredient.amount} ${ingredient.unitName} ${ingredient.ingredientName}`} />
          </ListItem>
          {index !== recipe.ingredients.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}
