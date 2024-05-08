"use client";
import { Button } from "@/components/button";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useEffectApiCall } from "@/hooks/use-effect-api-call";
import { WorkflowPage } from "@/pages/workflow";
import { convertWorkflowResponseToWorkflowComponents } from "@/pages/workflow/utils";
import { PageTemplate } from "@/templates/page-template";
import { Workflow } from "@/types/api";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useEffectApiCall<undefined, Workflow>(
    "get",
    `${process.env.WORKFLOW_ROOT_URL}/${params?.id}`,
    undefined,
    []
  );

  useEffect(() => {
    if (!params || !params.id) router.back();
  }, []);

  if (!params || !params.id) return <PageError error="Invalid route" />;

  if (isLoading) return <PageLoader />;

  if (isError || !data) return <PageError />;

  const components = convertWorkflowResponseToWorkflowComponents(data);

  return (
    <PageTemplate
      pageTitle="Edit workflow"
      headerComponent={<Button onClick={() => router.push("/")}>Home</Button>}
    >
      <WorkflowPage incomingComponents={{ components, workflowId: data.id }} />
    </PageTemplate>
  );
};

export default Page;
