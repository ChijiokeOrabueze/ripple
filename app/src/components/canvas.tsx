import React from "react";
import { CanvasCard } from "./canvas-card";
import { Button } from "./button";
import { WorkflowComponent } from "@/types/app";

export interface CanvasProps {
  currentStep: number;
  workflowComponents: WorkflowComponent[];
  setStep: (step: number) => void;
}

export const Canvas = ({
  currentStep,
  setStep,
  workflowComponents,
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
      {/* <CanvasCard name="Canvas1" state="past" value="hand" onClick={() => {}} />
      <CanvasCard name="Canvas2" state="current" onClick={() => {}} />
      <CanvasCard name="Canvas3" state="inFront" onClick={() => {}} /> */}
      <Button>Save</Button>
    </div>
  );
};
