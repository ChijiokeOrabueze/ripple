import { CircularProgress } from "@mui/material";
import React from "react";

export const PageLoader = () => {
  return (
    <div className="h-[100vh] w-full bg-background flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};
