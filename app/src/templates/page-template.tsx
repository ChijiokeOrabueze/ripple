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
    <div className="p-5 max-w-[100vw] flex flex-col gap-10">
      <div className="flex bg-primary w-full justify-between h-20 rounded-md p-5 items-center">
        <h1 className="font-bold text-lg">{pageTitle}</h1>
        {headerComponent}
      </div>

      {children}
    </div>
  );
};
