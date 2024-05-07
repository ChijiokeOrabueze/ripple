import React from "react";

export interface PageTemplateProps {
  children: React.ReactNode;
  pageTitle: React.ReactNode;
  headerComponent?: React.ReactNode;
}

export const PageTemplate = ({
  children,
  pageTitle,
  headerComponent,
}: PageTemplateProps) => {
  return (
    <div>
      <div className="flex justify-between align-center">
        <h1>{pageTitle}</h1>
        {headerComponent}
      </div>

      <div>{children}</div>
    </div>
  );
};
