"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";

export interface InputProps {
  value?: string;
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const Input = ({ value, label, placeholder, onChange }: InputProps) => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <InputLabel>{label}</InputLabel>
      <TextField
        fullWidth
        size="small"
        value={value}
        placeholder={placeholder}
        variant="outlined"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </Box>
  );
};
