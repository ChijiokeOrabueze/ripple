import React from "react";
import { CanvasCard } from "./canvas-card";
import { Button } from "./button";
import { WorkflowComponent } from "@/types/app";

export interface CanvasProps {
  currentStep: number;
  workflowComponents: WorkflowComponent[];
  isSaveLoading?: boolean;
  setStep: (step: number) => void;
  onSave: () => void;
}

export const Canvas = ({
  currentStep,
  workflowComponents,
  isSaveLoading,
  setStep,
  onSave,
}: CanvasProps) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      {workflowComponents.map(({ type, selectedValue }, index) => {
        const state =
          index === currentStep
            ? "current"
            : index < currentStep
            ? "past"
            : "inFront";
        if (type === "trigger") {
          return (
            <CanvasCard
              key={index}
              name="Trigger"
              state={state}
              value={selectedValue?.name}
              onClick={() => {
                setStep(index);
              }}
            />
          );
        }
        return (
          <CanvasCard
            key={index}
            name="Action"
            state={state}
            value={selectedValue?.name}
            onClick={() => {
              setStep(index);
            }}
          />
        );
      })}
      <Button isLoading={isSaveLoading} onClick={onSave}>
        Save
      </Button>
    </div>
  );
};
