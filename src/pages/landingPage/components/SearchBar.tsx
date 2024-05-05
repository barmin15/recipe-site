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

    const handleInputFocus = () => {
        //search icon changes color when client uses search bar
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        //search icon changes color when client uses search bar
        setInputFocused(false);
    };

    return (
        <TextField
            placeholder="Keress Receptet"
            variant="outlined"
            value={search}
            onChange={(event) =>  setSearch(event.target.value)}
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
