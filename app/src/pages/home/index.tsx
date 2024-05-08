"use client";
import { Button } from "@/components/button";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Table } from "@/components/table";
import { useEffectApiCall } from "@/hooks/use-effect-api-call";
import { PageTemplate } from "@/templates/page-template";
import { Workflow } from "@/types/api";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

export const Home = () => {
  const { data, isLoading, isError } = useEffectApiCall<undefined, Workflow[]>(
    "get",
    process.env.WORKFLOW_ROOT_URL,
    undefined,
    []
  );

  const router = useRouter();

  const workflows = useMemo(() => {
    if (!data) return [];
    return data.map(({ id, name, trigger, actions }) => ({
      id,
      workflow: name || id,
      trigger: trigger.name,
      action: actions.map(({ action }) => action.name).join(", "),
    }));
  }, [data]);

  if (isLoading) return <PageLoader />;

  if (isError) return <PageError />;

  return (
    <PageTemplate
      pageTitle="All workflows"
      headerComponent={
        <Button onClick={() => router.push("/create-workflow")}>
          Create new workflow
        </Button>
      }
    >
      <div>
        <Table
          columns={[
            { accessor: "workflow", value: "Workflow" },
            { accessor: "trigger", value: "Trigger" },
            { accessor: "action", value: "Action" },
          ]}
          rows={workflows}
          actionColumns={[
            {
              name: "Edit",
              value: "CTA",
              action: (data) => {
                console.log(data);
              },
            },
          ]}
        />
      </div>
    </PageTemplate>
  );
};
