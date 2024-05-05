import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Ingredient, IngredientUnit, Recipe, RecipeIngredient } from '../../../../data/recipeDatas';
import { isLotOfSugarOrSalt, isNotKosher, isUnhealthy } from '../../../../logic/ingredientCombinations';
import AlertSideBar from '../helper/AlertSideBar';
import CautionPopup from '../helper/CautionPopup';
import IngredientSelector from './ingredietnSelector/IngredietnSelector';
import AddIngredient from './ingredietnSelector/AddIngredient';

interface IngredientSelectionSectionProps {
  ingredients: Ingredient[];
  ingredientUnits: IngredientUnit[];
  setRecipe: React.Dispatch<React.SetStateAction<Recipe>>;
  recipe: Recipe;
}

const QuantityInput = ({ value, onChange }: { value: number | string; onChange: (value: number | string) => void }) => (
  <TextField
    fullWidth
    margin="normal"
    label="Mennyiség"
    type="number"
    name="quantity"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    size="small"
  />
);

export default function IngredientSelectionSection({ ingredients, ingredientUnits, setRecipe, recipe }: IngredientSelectionSectionProps) {
  const [selectedUnit, setSelectedUnit] = useState<IngredientUnit | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [quantity, setQuantity] = useState<number | string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isOpenErrorMessage, setIsOpenErrorMessage] = useState<boolean>(false);
  const [isOpenCautionBar, setIsOpenCautionBar] = useState<boolean>(false);

  const handleAddIngredient = (): void => {
    console.log('now')

    if (selectedUnit && selectedIngredient && typeof quantity === "number") {
      console.log('in')
      const kosherError = "kóser étel nem tartalmazhat egyszerre húst és tejterméket";
      const sugarSaltError = "túl sok cukrot vagy sót tartalmaz";
      const unhealthyWarning = "A hozzávalókban észleltünk zsírt és cukrot is";

      if (isNotKosher(recipe.description, recipe.ingredients, selectedIngredient.name)) {
        setErrorMessage(kosherError);
        setIsOpenErrorMessage(true);
      } else if (isLotOfSugarOrSalt(selectedIngredient.name, Number(quantity), selectedUnit.name)) {
        setErrorMessage(sugarSaltError);
        setIsOpenErrorMessage(true);
      } else if (isUnhealthy(recipe.ingredients, selectedIngredient.name)) {
        addIngredient();
        setErrorMessage(unhealthyWarning);
        setIsOpenCautionBar(true);
      } else {
        addIngredient();
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
  };

  return (
    <>
      <IngredientSelector
        label="Hozzávaló"
        options={ingredients}
        value={selectedIngredient?.id ?? null}
        onChange={(value) => {
          const selectedIngredient = ingredients.find((ingredient) => ingredient.id === value);
          setSelectedIngredient(selectedIngredient || null);
        }}
      />
      <IngredientSelector
        label="Egység"
        options={ingredientUnits}
        value={selectedUnit?.id ?? null}
        onChange={(value) => {
          const selectedUnit = ingredientUnits.find((unit) => unit.id === value);
          setSelectedUnit(selectedUnit || null);
        }}
      />
      <QuantityInput value={quantity} onChange={(value) => setQuantity(Number(value))} />
      <AddIngredient onClick={handleAddIngredient} />
      <CautionPopup isOpenCautionBar={isOpenCautionBar} setIsOpenCautionBar={setIsOpenCautionBar} errorMessage={errorMessage} />
      <AlertSideBar isOpenErrorMessage={isOpenErrorMessage} errorMessage={errorMessage} setIsOpenErrorMessage={setIsOpenErrorMessage} />
    </>
  );
};
