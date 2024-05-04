import React from 'react';
import { TextField } from '@mui/material';
import { Recipe } from '../../../../data/recipeDatas';

interface FormFieldsSectionProps {
  recipe: Recipe;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormFieldsSection({ recipe, handleChange }: FormFieldsSectionProps) {
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
        rows={2} // Adjusted rows to make the field smaller in height
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
        rows={2} // Adjusted rows to make the field smaller in height
        value={recipe.preparationSteps}
        onChange={handleChange}
        size="small"
      />
    </>
  );
}
