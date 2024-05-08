import React from "react";
import { Select } from "./select";
import { Input } from "./input";
import { Button } from "./button";
import { WorkflowActionComponent, WorkflowComponent } from "@/types/app";
import { Trigger } from "@/types/api";

export interface ActionSideBarProps {
  currentWorkflowComponent: WorkflowActionComponent;
  selectedTrigger: Trigger;
  setCurrentWorkflowComponent: (component: WorkflowComponent) => void;
}

export const ActionSideBar = ({
  currentWorkflowComponent,
  selectedTrigger,
  setCurrentWorkflowComponent,
}: ActionSideBarProps) => {
  const { selectedValue } = currentWorkflowComponent;
  return (
    <>
      <Input
        label="Enter Action Name"
        value={selectedValue?.name}
        onChange={(value) =>
          setCurrentWorkflowComponent({
            type: "action",
            selectedValue: {
              ...selectedValue,
              name: value,
            },
          })
        }
      />
      <Input
        label="Url"
        value={selectedValue?.url}
        onChange={(value) =>
          setCurrentWorkflowComponent({
            type: "action",
            selectedValue: {
              ...selectedValue,
              url: value,
            },
          })
        }
      />
      <div className="flex flex-col gap-3 border-t border-primary pt-2 ">
        <h1>Parameters</h1>

        <div className="flex flex-col gap-3">
          {selectedValue?.params?.map(({ name, value }, paramIndex) => (
            <div key={value} className="flex items-center justify-center gap-2">
              <Input
                label="Name"
                value={name}
                onChange={(data) => {
                  const params = [...(selectedValue?.params || [])];
                  params[paramIndex] = { name: data, value };
                  setCurrentWorkflowComponent({
                    type: "action",
                    selectedValue: {
                      ...selectedValue,
                      params,
                    },
                  });
                }}
              />

              <Select
                label="Value"
                value={{ value, name: value }}
                options={selectedTrigger.params.map(({ name }) => ({
                  name,
                  value: name,
                }))}
                onChange={(data) => {
                  const params = [...(selectedValue?.params || [])];
                  params[paramIndex] = { name, value: data.value };
                  setCurrentWorkflowComponent({
                    type: "action",
                    selectedValue: {
                      ...selectedValue,
                      params,
                    },
                  });
                }}
              />
            </div>
          ))}
        </div>
        <Button
          onClick={() => {
            const params = [...(selectedValue?.params || [])];
            if (params.some(({ name, value }) => !name || !value)) return;
            params.push({ name: "", value: "" });
            setCurrentWorkflowComponent({
              type: "action",
              selectedValue: {
                ...selectedValue,
                params,
              },
            });
          }}
        >
          Add Parameter
        </Button>
      </div>
    </>
  );
};
