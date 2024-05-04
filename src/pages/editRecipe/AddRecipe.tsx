import { useState } from 'react';
import { Recipe } from '../../data/recipeDatas';
import RecipeForm from './components/RecipeForm'; 
import NavigateBack from './components/helper/NavigateBack';

export default function AddRecipe() {
  const [recipe, setRecipe] = useState<Recipe>({
    id: 0,
    name: '',
    description: '',
    preparationSteps: '',
    ingredients: []
  });


  return (
    <>
    <RecipeForm fetchEndpoint={"/recipes/"} fetchMethod={"POST"} setRecipe={setRecipe} recipe={recipe} />
    <NavigateBack />
    </>
  );
};