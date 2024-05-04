import { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, TextField, Box, Button, Alert, IconButton } from '@mui/material';
import { Ingredient, IngredientUnit, Recipe } from '../../../../data/recipeDatas';
import CloseIcon from '@mui/icons-material/Close';
import { isMobile } from 'react-device-detect';
import { isLotOfSugarOrSalt, isNotKosher } from '../../../../logic/recipeCreation';

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

  const handleAddIngredient = () => {
    if (selectedUnit && selectedIngredient && typeof quantity === "number") {
      if (isNotKosher(recipe.description)) {
        setErrorMessage("kóser étel nem tartalmazhat egyzerre húst és tejterméket");
        setIsOpenErrorMessage(true);
      } else if (isLotOfSugarOrSalt(selectedIngredient.name, Number(quantity), selectedUnit.name)) {
        setErrorMessage("túl sok cukrot vagy sót tartalmaz");
        setIsOpenErrorMessage(true);
      } else {
        const previousIngredients = recipe.ingredients;
        setRecipe({
          ...recipe,
          ingredients: [
            ...previousIngredients,
            {
              id: 0,
              amount: quantity,
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
    }
  };

  const handleCloseErrorMessage = () => {
    setErrorMessage("");
    setIsOpenErrorMessage(false);
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
        onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
        size="small"
      />
      <Box mt={2} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleAddIngredient}>
          Hozzáadom
        </Button>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: isMobile ? 'unset' : '10px',
          top: isMobile ? '10px' : 'unset',
          left: '10px',
          right: '10px',
          width: isMobile ? 'calc(100% - 20px)' : '27%',
          zIndex: 9999,
        }}
        className={isOpenErrorMessage ? 'error-message open' : 'error-message'}
      >
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleCloseErrorMessage}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {errorMessage}
        </Alert>
      </Box>
    </>
  );
}
