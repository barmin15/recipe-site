import { TextField } from "@mui/material";

interface QuantityInputProps {
    value: string | number;
    onChange: (value: number | string) => void;
}

export default function QuantityInput({ value, onChange }: QuantityInputProps) {

    return (<TextField
        fullWidth
        margin="normal"
        label="Mennyiség"
        type="number"
        name="quantity"
        value={value}
        onChange={(e) => {
            const input = e.target.value;
            !input.includes('-') && onChange(e.target.value);
        }}
        size="small"
    />)
}