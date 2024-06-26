import { Canvas } from "@/components/canvas";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { SideBar } from "@/components/side-bar";
import { useApiCall } from "@/hooks/use-api-call";
import { useEffectApiCall } from "@/hooks/use-effect-api-call";
import { ActionRequest, Trigger, Workflow } from "@/types/api";
import { WorkflowActionValue, WorkflowComponent } from "@/types/app";
import { notifyError } from "@/utils/notify";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { isActionChanged } from "./utils";

export interface WorkflowPageProps {
  incomingComponents?: { components: WorkflowComponent[]; workflowId: string };
}

export const WorkflowPage = ({ incomingComponents }: WorkflowPageProps) => {
  const isInEditMode = !!incomingComponents;
  const [step, setStep] = useState(0);
  const [workflowComponents, setWorkflowComponents] = useState<
    WorkflowComponent[]
  >(
    incomingComponents?.components || [
      { type: "trigger", isDisabled: true },
      { type: "action" },
    ]
  );

  const { data, isLoading, isError } = useEffectApiCall<undefined, Trigger[]>(
    "get",
    process.env.TRIGGER_ROOT_URL,
    undefined,
    []
  );

  const createWorkflowApiCall = useApiCall<unknown, Workflow>(
    "post",
    process.env.WORKFLOW_ROOT_URL
  );

  const editWorkflowApiCall = useApiCall<unknown, Workflow>(
    "put",
    process.env.WORKFLOW_ROOT_URL
  );

  const router = useRouter();

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

  const createOrEditWorkflow = async () => {
    let trigger = "";
    const actions: ActionRequest[] = [];
    let error = "";

    workflowComponents.every((item) => {
      if (item.type === "trigger") {
        trigger = item.selectedValue?.id || "";
        return true;
      }

      if (!item.selectedValue || !item.selectedValue.name) {
        error = "Please select action to proceed.";
        return false;
      }

      if (!item.selectedValue.url) {
        error = `Please add url for action "${item.selectedValue.name}"`;
        return false;
      }

      const params =
        item.selectedValue.params?.filter(({ name, value }) => name && value) ||
        [];

      actions.push({
        params,
        name: item.selectedValue.name,
        url: item.selectedValue.url,
        order: actions.length + 1,
      });
      return true;
    });

    if (!trigger) error = "Please select trigger.";

    if (error) {
      notifyError(error);
      return;
    }

    if (isInEditMode) {
      const incomingActions: WorkflowActionValue[] = [];
      incomingComponents.components.forEach(({ type, selectedValue }) => {
        if (type === "action" && selectedValue)
          incomingActions.push(selectedValue);
      });
      if (!isActionChanged(incomingActions[0], actions[0]))
        return notifyError("Nothing has changed");

      const actionId = incomingActions[0].id;
      if (!actionId) return;

      const editResponse = await editWorkflowApiCall.run(
        actions[0],
        `/${incomingComponents.workflowId}/${actionId}`
      );

      if (editResponse) router.push("/");

      return;
    }

    const createResponse = await createWorkflowApiCall.run({
      trigger,
      actions,
    });

    if (createResponse) router.push("/");
  };

  if (isLoading) return <PageLoader />;

  if (isError) return <PageError />;

  return (
    <div className="w-full h-full flex">
      <div className="grow">
        <Canvas
          currentStep={step}
          workflowComponents={workflowComponents}
          setStep={(incomingStep) => {
            if (incomingStep > step && !selectedTrigger) return;
            setStep(incomingStep);
          }}
          onSave={createOrEditWorkflow}
          isSaveLoading={
            createWorkflowApiCall.isLoading || editWorkflowApiCall.isLoading
          }
        />
      </div>
      <SideBar
        currentWorkflowComponent={workflowComponents[step]}
        allTriggers={data!}
        selectedTrigger={selectedTrigger}
        setCurrentWorkflowComponent={(component, resetNextActions) => {
          const components = workflowComponents.map((prev, index) => {
            if (index === step) return component;

            if (resetNextActions && prev.type === "action")
              return { ...prev, selectedValue: undefined };

            return prev;
          });

          setWorkflowComponents(components);
        }}
        isInEditMode={isInEditMode}
      />
    </div>
  );
};
