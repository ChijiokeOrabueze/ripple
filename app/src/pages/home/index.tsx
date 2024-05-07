"use client";
import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { useEffectApiCall } from "@/hooks/use-effect-api-call";
import { PageTemplate } from "@/templates/page-template";
import { Workflow } from "@/types/api";
import React, { useMemo } from "react";

export const Home = () => {
  const { data, isLoading, isError } = useEffectApiCall<undefined, Workflow[]>(
    "get",
    "http://localhost:8080/api/v1/workflows",
    undefined,
    []
  );

  const workflows = useMemo(() => {
    if (!data) return [];
    return data.map(({ id, name, trigger, actions }) => ({
      id,
      workflow: name || id,
      trigger: trigger.name,
      action: actions.map(({ action }) => action.name).join(", "),
    }));
  }, [data]);

  return (
    <PageTemplate
      pageTitle="All workflows"
      headerComponent={
        <Button
          onClick={() => {
            console.log("hello");
          }}
        >
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
