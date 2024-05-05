import { Select, MenuItem, InputLabel, FormControl} from '@mui/material';

interface SelectorProps {
    label: string;
    options: { id: number; name: string }[];
    value: number | null;
    onChange: (value: number | null) => void;
}

export default function IngredientSelector({ label, options, value, onChange }: SelectorProps) {

    return (<FormControl fullWidth margin="normal" size="small">
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
            labelId={`${label}-select-label`}
            value={value ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
        >
            {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
    );
}
