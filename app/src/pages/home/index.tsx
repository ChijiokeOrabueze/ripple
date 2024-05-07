"use client";
import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { PageTemplate } from "@/templates/page-template";
import React from "react";

export const Home = () => {
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
