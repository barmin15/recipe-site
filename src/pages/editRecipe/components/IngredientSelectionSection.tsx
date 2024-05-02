import React from 'react';
import { Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import { Ingredient, IngredientUnit } from '../../../data/recipeDatas';

interface IngredientSelectionSectionProps {
  ingredients: Ingredient[];
  ingredientUnits: IngredientUnit[];
  ingredient: string;
  unit: string;
  quantity: number | '';
  setIngredient: React.Dispatch<React.SetStateAction<string>>;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
  setQuantity: React.Dispatch<React.SetStateAction<number | ''>>;
}

export default function IngredientSelectionSection({
  ingredients,
  ingredientUnits,
  ingredient,
  unit,
  quantity,
  setIngredient,
  setUnit,
  setQuantity,
}: IngredientSelectionSectionProps) {
  return (
    <>
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="ingredient-select-label">Ingredient</InputLabel>
        <Select
          labelId="ingredient-select-label"
          id="ingredient-select"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value as string)}
        >
          {ingredients.map((ingredient, index) => (
            <MenuItem key={index} value={ingredient.name}>
              {ingredient.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="unit-select-label">Unit</InputLabel>
        <Select
          labelId="unit-select-label"
          id="unit-select"
          value={unit}
          onChange={(e) => setUnit(e.target.value as string)}
        >
          {ingredientUnits.map((unit, index) => (
            <MenuItem key={index} value={unit.name}>
              {unit.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Quantity"
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
        size="small"
      />
    </>
  );
}
