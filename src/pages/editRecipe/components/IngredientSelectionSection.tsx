import { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, TextField, Box, Button } from '@mui/material';
import { Ingredient, IngredientUnit, Recipe } from '../../../data/recipeDatas';

interface IngredientSelectionSectionProps {
  ingredients: Ingredient[];
  ingredientUnits: IngredientUnit[];
  setRecipe: React.Dispatch<any>;
  recipe: Recipe;
}

export default function IngredientSelectionSection({ ingredients, ingredientUnits, setRecipe, recipe }: IngredientSelectionSectionProps) {
  const [selectedUnit, setSelectedUnit] = useState<IngredientUnit | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [quantity, setQuantity] = useState<number | string>("");

  const handleAddIngredient = () => {
    if(selectedUnit && selectedIngredient && quantity ){
      const previousIngredients = recipe.ingredients;
      setRecipe({
        ...recipe,
        ingredients: [
          ...previousIngredients,
          {
            id: 0,
            amount : quantity,
            ingredientId: selectedIngredient.id,
            ingredientName: selectedIngredient.name,
            unitId: selectedUnit.id,
            unitName: selectedUnit.name
          }
        ]
      })
      setSelectedIngredient(null);
      setSelectedUnit(null);
      setQuantity("");
    }
  };

  return (
    <>
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="ingredient-select-label">Hozzávaló</InputLabel>
        <Select
          labelId="ingredient-select-label"
          id="ingredient-select"
          value={selectedIngredient ? selectedIngredient.id : ""}
          onChange={(e) => {
            const selectedIngredientId = Number(e.target.value);
            const selectedIngredient = ingredients.find(ingredient => ingredient.id === selectedIngredientId);
            setSelectedIngredient(selectedIngredient || null);
          }}
        >
          {ingredients.map((ingredient) => (
            <MenuItem key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="unit-select-label">Egység</InputLabel>
        <Select
          labelId="unit-select-label"
          id="unit-select"
          value={selectedUnit ? selectedUnit.id : ""}
          onChange={(e) => {
            const selectedUnitId = Number(e.target.value);
            const selectedUnit = ingredientUnits.find(unit => unit.id === selectedUnitId);
            setSelectedUnit(selectedUnit || null);
          }}
        >
          {ingredientUnits.map((unit) => (
            <MenuItem key={unit.id} value={unit.id}>
              {unit.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Mennyiség"
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
        size="small"
      />
      <Box mt={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleAddIngredient}>
          Hozzáadom
        </Button>
      </Box>
    </>
  );
}
