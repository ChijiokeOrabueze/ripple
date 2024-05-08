"use client";
import { Button } from "@/components/button";
import { WorkflowPage } from "@/pages/workflow";
import { PageTemplate } from "@/templates/page-template";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  return (
    <PageTemplate
      pageTitle="Create workflow"
      headerComponent={<Button onClick={() => router.push("/")}>Home</Button>}
    >
      <WorkflowPage />
    </PageTemplate>
  );
};

export default Page;
