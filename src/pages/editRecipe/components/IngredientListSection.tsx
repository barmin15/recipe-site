import { Typography, Box } from '@mui/material';
import { Recipe } from '../../../data/recipeDatas';

interface IngredientListSectionProps {
  recipe: Recipe;
}

export default function IngredientListSection({ recipe }: IngredientListSectionProps) {
  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        Hozzávalók:
      </Typography>
      {recipe.ingredients.map((ingredient, index) => (
        <ul key={index}>{`- ${ingredient.amount} ${ingredient.unitName} ${ingredient.ingredientName}`}</ul>
      ))}
    </Box>
  );
}


