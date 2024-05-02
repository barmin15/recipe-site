import {Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import CollapsableTableRow from "./CollapsableTableRow"; // Import the new component
import { Recipe } from "../../../data/recipeDatas";

interface RecipeListProps {
    recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="recipe table">
                <TableHead>
                    <TableRow>
                        <TableCell>Név</TableCell>
                        <TableCell>Leírás</TableCell>
                        <TableCell>Elkészítési lépések</TableCell>
                        <TableCell>Szerkesztés</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recipes.map((recipe) => (
                        <CollapsableTableRow key={recipe.id} recipe={recipe} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
