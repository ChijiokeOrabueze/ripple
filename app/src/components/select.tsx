"use client";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import PrimitiveSelect, { SelectChangeEvent } from "@mui/material/Select";

export type SelectOption = {
  name: string;
  value: string;
};

export interface SelectProps {
  value?: SelectOption;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  onChange: (value: SelectOption) => void;
}

export const Select = ({
  value,
  label,
  placeholder,
  options,
  onChange,
}: SelectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <FormControl fullWidth>
        <PrimitiveSelect
          size="small"
          value={value?.name}
          label={label}
          placeholder={placeholder}
          onChange={handleChange}
        >
          {options.map(({ value, name }) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </PrimitiveSelect>
      </FormControl>
    </Box>
  );
};
