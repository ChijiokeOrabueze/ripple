import { WorkflowComponent, WorkflowTriggerComponent } from "@/types/app";
import { Input } from "./input";
import { Trigger } from "@/types/api";
import { useMemo } from "react";
import { Select } from "./select";

export interface TriggerSideBarProps {
  currentWorkflowComponent: WorkflowTriggerComponent;
  allTriggers: Trigger[];
  setCurrentWorkflowComponent: (
    component: WorkflowComponent,
    resetNextAction?: boolean
  ) => void;
}

export const TriggerSideBar = ({
  currentWorkflowComponent,
  allTriggers,
  setCurrentWorkflowComponent,
}: TriggerSideBarProps) => {
  const triggerOptions = useMemo(() => {
    if (!allTriggers) return [];
    return allTriggers.map(({ id, name }) => ({ name, value: id }));
  }, [allTriggers]);
  const { selectedValue } = currentWorkflowComponent;
  return (
    <>
      <Select
        label="Select Trigger"
        value={
          selectedValue
            ? { value: selectedValue.id, name: selectedValue.name }
            : undefined
        }
        options={triggerOptions}
        onChange={(value) => {
          const newSelectedValue = allTriggers?.find(
            ({ id }) => id === value.value
          );
          setCurrentWorkflowComponent(
            {
              type: "trigger",
              selectedValue: newSelectedValue,
            },
            newSelectedValue?.id !== selectedValue?.id
          );
        }}
      />
      <Input disabled label="Url" value={selectedValue?.url} />
      <div className="flex flex-col gap-3 border-t border-primary pt-2 ">
        <h1>Parameters</h1>

        <div className="flex flex-col justify-center gap-2">
          {selectedValue?.params.map(({ name }, index) => (
            <Input key={index} disabled label="Name" value={name} />
          ))}
        </div>
      </div>
    </>
  );
};
