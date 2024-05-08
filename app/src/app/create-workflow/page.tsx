"use client";
import { WorkflowPage } from "@/pages/workflow";
import { PageTemplate } from "@/templates/page-template";
import React from "react";

const Page = () => {
  return (
    <PageTemplate pageTitle="Create workflow">
      <WorkflowPage />
    </PageTemplate>
  );
};

export default Page;
