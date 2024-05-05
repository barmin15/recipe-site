import { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    search: string;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {
    const [inputFocused, setInputFocused] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    return (
        <TextField
            placeholder="Keress Receptet"
            variant="outlined"
            value={search}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2, backgroundColor: '#EEEEEEE6' }}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                startAdornment: (
                    <IconButton disabled={inputFocused} onClick={handleInputFocus}>
                        <SearchIcon />
                    </IconButton>
                ),
                endAdornment: (
                    <IconButton onClick={() => setSearch('')} size="small">
                        <ClearIcon sx={{ "&:hover": { color: "black" } }} />
                    </IconButton>
                ),
                onFocus: handleInputFocus,
                onBlur: handleInputBlur,
            }}
        />
    );
}
