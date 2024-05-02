import React from 'react';
import { TextField } from '@mui/material';
import { Recipe } from '../../../data/recipeDatas';

interface FormFieldsSectionProps {
  recipe: Recipe;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormFieldsSection({ recipe, handleChange }: FormFieldsSectionProps) {
  return (
    <>
      <TextField fullWidth margin="normal" label="Name" name="name" value={recipe.name} onChange={handleChange} size="small" />
      <TextField fullWidth margin="normal" label="Description" name="description" multiline rows={3} value={recipe.description} onChange={handleChange} size="small" />
      <TextField fullWidth margin="normal" label="Preparation Steps" name="preparationSteps" multiline rows={3} value={recipe.preparationSteps} onChange={handleChange} size="small" />
    </>
  );
}
