import React from "react";

export interface PageErrorProps {
  error?: string;
}

export const PageError = ({ error }: PageErrorProps) => {
  return (
    <div className="h-[100vh] w-full">
      <p>
        {error ||
          "An error occured while trying to fetch data. Please check your network connection and try again."}
      </p>
    </div>
  );
};
