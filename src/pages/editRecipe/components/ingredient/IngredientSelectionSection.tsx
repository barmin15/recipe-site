import { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, TextField, Box, Button } from '@mui/material';
import { Ingredient, IngredientUnit, Recipe, RecipeIngredient } from '../../../../data/recipeDatas';
import { isLotOfSugarOrSalt, isNotKosher, isUnhealthy } from '../../../../logic/ingredientCombinations';
import AlertSideBar from '../helper/AlertSIdeBar';
import CautionPopup from '../helper/CautionPopup';

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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isOpenErrorMessage, setIsOpenErrorMessage] = useState<boolean>(false);
  const [isOpenCautionBar, setIsOpenCautionBar] = useState<boolean>(false);

  const handleAddIngredient = (): void => {
    if (selectedUnit && selectedIngredient && typeof quantity === "number") {
      const kosherError = "kóser étel nem tartalmazhat egyzerre húst és tejterméket";
      const sugarSaltError = "túl sok cukrot vagy sót tartalmaz";
      const unhealthyWarning = "A hozzávalókban észleltünk zsírt és cukrot is";

      if (isNotKosher(recipe.description, recipe.ingredients, selectedIngredient.name)) {
        setErrorMessage(kosherError);
        setIsOpenErrorMessage(true);
      } else if (isLotOfSugarOrSalt(selectedIngredient.name, Number(quantity), selectedUnit.name)) {
        setErrorMessage(sugarSaltError);
        setIsOpenErrorMessage(true);
      } else if (isUnhealthy(recipe.ingredients, selectedIngredient.name)) {
        addIngredient()
        setErrorMessage(unhealthyWarning);
        setIsOpenCautionBar(true);
      } else {
        addIngredient()
      }
    }
  };

  const addIngredient = () => {
    if (selectedUnit && selectedIngredient && typeof quantity === "number") {
      const newIngredient: RecipeIngredient = {
        id: 0,
        amount: quantity,
        ingredientId: selectedIngredient.id,
        ingredientName: selectedIngredient.name,
        unitId: selectedUnit.id,
        unitName: selectedUnit.name
      };

      const updatedIngredients = [...recipe.ingredients, newIngredient];
      setRecipe({ ...recipe, ingredients: updatedIngredients });

      setSelectedIngredient(null);
      setSelectedUnit(null);
      setQuantity("");
    }
  }


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
        onChange={(e) => {
          const value = e.target.value === "" ? "" : Number(e.target.value);
          if (Number(value) > 0) setQuantity(value);
        }}
        size="small"
      />

      <Box mt={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleAddIngredient}>
          Hozzáadom
        </Button>
      </Box>
      <CautionPopup isOpenCautionBar={isOpenCautionBar} setIsOpenCautionBar={setIsOpenCautionBar} errorMessage={errorMessage} />
      <AlertSideBar isOpenErrorMessage={isOpenErrorMessage} errorMessage={errorMessage} setIsOpenErrorMessage={setIsOpenErrorMessage} />
    </>
  );
}
