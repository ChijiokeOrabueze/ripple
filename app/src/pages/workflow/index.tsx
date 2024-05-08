import { Button } from "@/components/button";
import { Canvas } from "@/components/canvas";
import { Input } from "@/components/input";
import { Select, SelectOption } from "@/components/select";
import { SideBar } from "@/components/side-bar";
import { useEffectApiCall } from "@/hooks/use-effect-api-call";
import { Trigger } from "@/types/api";
import { WorkflowComponent } from "@/types/app";
import React, { useMemo, useState } from "react";

export const WorkflowPage = () => {
  const [step, setStep] = useState(0);
  const [workflowComponents, setWorkflowComponents] = useState<
    WorkflowComponent[]
  >([{ type: "trigger", isDisabled: true }, { type: "action" }]);

  const { data, isLoading, isError } = useEffectApiCall<undefined, Trigger[]>(
    "get",
    "http://localhost:8080/api/v1/triggers",
    undefined,
    []
  );

  console.log(workflowComponents);

  const selectedTrigger = useMemo(() => {
    let prevTrigger: Trigger | undefined = undefined;

    for (let i = step; i >= 0; i--) {
      const currentWorkflowComponent = workflowComponents[i];
      if (currentWorkflowComponent.type === "trigger") {
        prevTrigger = currentWorkflowComponent.selectedValue;
        break;
      }
    }

    return prevTrigger;
  }, [workflowComponents, data]);

  return (
    <div className="w-full h-full flex">
      <div className="grow">
        <Canvas
          currentStep={step}
          workflowComponents={workflowComponents}
          setStep={(step) => setStep(step)}
        />
      </div>
      <SideBar
        currentWorkflowComponent={workflowComponents[step]}
        allTriggers={data!}
        selectedTrigger={selectedTrigger}
        setCurrentWorkflowComponent={(component) => {
          const components = workflowComponents.map((prev, index) =>
            index === step ? component : prev
          );

          setWorkflowComponents(components);
        }}
      />
    </div>
  );
};
