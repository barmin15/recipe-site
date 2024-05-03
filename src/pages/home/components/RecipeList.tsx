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
                    <TableRow sx={{backgroundColor: '#803D3B99'}}>
                        <TableCell sx={{fontWeight: 'bold'}}>Név</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Leírás</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Elkészítési lépések</TableCell>
                        <TableCell sx={{fontWeight: 'bold'}}>Szerkesztés</TableCell>
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
