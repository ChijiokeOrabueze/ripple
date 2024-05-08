import { Action, Trigger } from "./api";

export type WorkflowTriggerComponent = {
  type: "trigger";
  selectedValue?: Trigger;
  isDisabled?: boolean;
};
export type WorkflowActionValue = Partial<Action>;

export type WorkflowActionComponent = {
  type: "action";
  selectedValue?: WorkflowActionValue;
  isDisabled?: boolean;
};

export type WorkflowComponent =
  | WorkflowTriggerComponent
  | WorkflowActionComponent;
