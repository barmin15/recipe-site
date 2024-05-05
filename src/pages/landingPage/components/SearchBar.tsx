import { IconButton, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    search: string;
}

export default function SearchBar({search, setSearch} : SearchBarProps) {

    return (<TextField
        label="Keress Receptet"
        variant="outlined"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        fullWidth
        sx={{ marginBottom: 2, backgroundColor: '#EEEEEEE6' }}
        InputProps={{
            endAdornment: (
                <IconButton onClick={() => setSearch("")} size="small">
                    <ClearIcon sx={{ "&:hover": { color: "black" } }} />
                </IconButton>
            ),
        }}
    />

    )
}