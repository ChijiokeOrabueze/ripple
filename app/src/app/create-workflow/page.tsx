"use client";
import { Button } from "@/components/button";
import { WorkflowPage } from "@/pages/workflow";
import { PageTemplate } from "@/templates/page-template";
import React from "react";

const Page = () => {
  return (
    <PageTemplate
      pageTitle="Create workflow"
      headerComponent={<Button onClick={() => {}}>Save</Button>}
    >
      <WorkflowPage />
    </PageTemplate>
  );
};

export default Page;
