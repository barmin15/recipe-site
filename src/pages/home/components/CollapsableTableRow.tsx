import { useState } from "react";
import { TableRow, TableCell, IconButton, Collapse, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { Recipe } from "../../../data/recipeDatas";
import { useMediaQuery } from "@mui/material";

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
        return text.length > 20 ? text.slice(0, 20) + "..." : text;
    };

    return (
        <>
            <TableRow onClick={() => handleRowClick(recipe.id)} sx={{ cursor: "pointer", "&:hover": { backgroundColor: 'lightGrey' }, width: '100%' }}>
                <TableCell>{recipe.name}</TableCell>
                <TableCell>{shortenText(recipe.description)}</TableCell>
               <TableCell >{shortenText(recipe.preparationSteps)}</TableCell>
                <TableCell>
                    <Link to={`/edit/${recipe.id}`} style={{ textDecoration: "none" }}>
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </Link>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={isMobile ? 4 : 4}>
                    <Collapse in={openRowId === recipe.id} timeout="auto" unmountOnExit>
                        <Paper elevation={3} style={{ padding: 10 }}>
                            <div>
                                <strong>{recipe.name}</strong>
                            </div>
                            <div>
                                <strong>Leírás:</strong> {recipe.description}
                            </div>

                            <div>
                                <strong>Elkészítési lépések:</strong> {recipe.preparationSteps}
                            </div>
                            <div>
                                <strong>Hozzávalók:</strong>
                                {recipe.ingredients.length > 0 ?
                                    <ul>
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul> : " nincsenek"}
                            </div>
                        </Paper>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
