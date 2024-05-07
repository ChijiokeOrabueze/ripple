"use client";
import React from "react";
import PrimitiveButton from "@mui/material/Button";

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
export const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <PrimitiveButton
      variant="contained"
      size="small"
      className={`rounded-full normal-case bg-secondary/70 ${className}`}
      onClick={onClick}
    >
      {children}
    </PrimitiveButton>
  );
};
