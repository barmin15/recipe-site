import { useState } from "react";
import { TableRow, TableCell, IconButton, Collapse, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { Recipe } from "../../../data/recipeDatas";
import { useMediaQuery } from "@mui/material";

import OpenRecipe from "./OpenRecipe";

interface CollapsableTableRowProps {
    recipe: Recipe;
}

export default function CollapsableTableRow({ recipe }: CollapsableTableRowProps) {
    const [openRowId, setOpenRowId] = useState<number | null>(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleRowClick = (recipeId: number) => {
        setOpenRowId(openRowId === recipeId ? null : recipeId);
    };

    const shortenText = (text: string) => {
        return text.length > 14 ? text.slice(0, 14) + "..." : text;
    };

    return (
        <>
            <TableRow onClick={() => handleRowClick(recipe.id)} sx={{ cursor: "pointer" ,"&:hover": { backgroundColor: '#F5F5F5' }, width: '100%' }}>
                <TableCell sx={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>{recipe.name}</TableCell>
                <TableCell sx={{textAlign: 'center'}}>{shortenText(recipe.description)}</TableCell>
                <TableCell sx={{display: { xs: 'none', sm: 'table-cell' }, textAlign: 'center'}}>{shortenText(recipe.preparationSteps)}</TableCell>
                <TableCell sx={{textAlign: 'center'}}>
                    <Link to={`/edit/${recipe.id}`} style={{ textDecoration: "none" }}>
                        <IconButton aria-label="edit" sx={{ "&:hover": { color: 'black' } }}>
                            <EditIcon />
                        </IconButton>
                    </Link>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{ paddingBottom: 0, paddingTop: 0, backgroundColor: "#E5E1DA" }} colSpan={isMobile ? 4 : 4}>
                    <Collapse in={openRowId === recipe.id} timeout="auto" unmountOnExit>
                        <Paper elevation={3} sx={{ padding: 1, backgroundColor: "#F5F5F5" }}>
                            <OpenRecipe id={recipe.id} />
                        </Paper>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
