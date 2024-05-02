import { Typography, Box } from '@mui/material';
import { Recipe } from '../../../data/recipeDatas';

interface IngredientListSectionProps {
  recipe: Recipe;
}

export default function IngredientListSection({ recipe }: IngredientListSectionProps) {
  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>
        Ingredients:
      </Typography>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </Box>
  );
}


