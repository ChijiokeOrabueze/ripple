import React from "react";
import { WorkflowComponent } from "@/types/app";
import { Trigger } from "@/types/api";
import { TriggerSideBar } from "./trigger-side-bar";
import { ActionSideBar } from "./action-side-bar";

export interface SideBarProps {
  currentWorkflowComponent: WorkflowComponent;
  allTriggers: Trigger[];
  selectedTrigger?: Trigger;
  setCurrentWorkflowComponent: (
    component: WorkflowComponent,
    resetNextAction?: boolean
  ) => void;
}

export const SideBar = ({
  currentWorkflowComponent,
  allTriggers,
  selectedTrigger,
  setCurrentWorkflowComponent,
}: SideBarProps) => {
  return (
    <div className="flex flex-col gap-8 h-[100vh] w-[407px] p-5 flex-none border-2 rounded-md border-primary">
      {currentWorkflowComponent.type === "trigger" ? (
        <TriggerSideBar
          currentWorkflowComponent={currentWorkflowComponent}
          allTriggers={allTriggers}
          setCurrentWorkflowComponent={setCurrentWorkflowComponent}
        />
      ) : selectedTrigger ? (
        <ActionSideBar
          currentWorkflowComponent={currentWorkflowComponent}
          selectedTrigger={selectedTrigger}
          setCurrentWorkflowComponent={setCurrentWorkflowComponent}
        />
      ) : null}
    </div>
  );
};
