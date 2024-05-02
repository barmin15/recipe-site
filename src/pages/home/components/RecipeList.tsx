import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Recipe } from "../../../data/recipeDatas";

interface RecipeListProps {
    recipe: Recipe;
}

export default function RecipeList({recipe} : RecipeListProps){
    return (
        <TableContainer component={Paper}>
            <Table aria-label="recipe table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Preparation Steps</TableCell>
                        <TableCell>Ingredients</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={recipe.id}>
                        <TableCell>{recipe.name}</TableCell>
                        <TableCell>{recipe.description}</TableCell>
                        <TableCell>{recipe.preparationSteps}</TableCell>
                        <TableCell>
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}