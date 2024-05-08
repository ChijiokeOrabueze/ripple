"use client";
import React from "react";
import PrimitiveButton from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}
export const Button = ({
  isDisabled,
  isLoading,
  className,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <PrimitiveButton
      variant="contained"
      size="small"
      className={`rounded-full normal-case bg-secondary/70 ${className}`}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? <CircularProgress /> : children}
    </PrimitiveButton>
  );
};
