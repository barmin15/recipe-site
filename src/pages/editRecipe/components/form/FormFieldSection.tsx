import React from 'react';
import { TextField } from '@mui/material';
import { Recipe } from '../../../../data/recipeDatas';

interface FormFieldsSectionProps {
  recipe: Recipe;
  setRecipe: React.Dispatch<any>;
}

export default function FormFieldsSection({ recipe, setRecipe }: FormFieldsSectionProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Név"
        name="name"
        value={recipe.name}
        onChange={handleChange}
        size="small"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Leírás"
        name="description"
        multiline
        rows={4}
        value={recipe.description}
        onChange={handleChange}
        size="small"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Elkészítési lépések"
        name="preparationSteps"
        multiline
        rows={4}
        value={recipe.preparationSteps}
        onChange={handleChange}
        size="small"
      />
    </>
  );
}
