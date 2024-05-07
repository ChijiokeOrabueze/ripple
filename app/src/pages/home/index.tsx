"use client";
import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { useEffectApiCall } from "@/hooks/use-effect-api-call";
import { PageTemplate } from "@/templates/page-template";
import { Workflow } from "@/types/api";
import React from "react";

export const Home = () => {
  const { data, isLoading, isError } = useEffectApiCall<undefined, Workflow[]>(
    "get",
    "http://localhost:8080/workflows",
    undefined,
    []
  );

  console.log({ data, isLoading, isError });
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
            { accessor: "desert", value: "Workflow" },
            { accessor: "calories", value: "Trigger" },
            { accessor: "fat", value: "Action" },
          ]}
          rows={[
            {
              desert: "Frozen yoghurt",
              calories: 45.0,
              fat: 56.0,
            },
            {
              desert: "Frozen yoghurt4",
              calories: 45.0,
              fat: 56.0,
            },
          ]}
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
