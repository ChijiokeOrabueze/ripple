import { Action, Trigger } from "./api";

export type WorkflowTriggerComponent = {
  type: "trigger";
  selectedValue?: Trigger;
  isDisabled?: boolean;
};

export type WorkflowActionComponent = {
  type: "action";
  selectedValue?: Partial<Omit<Action, "id">>;
  isDisabled?: boolean;
};

export type WorkflowComponent =
  | WorkflowTriggerComponent
  | WorkflowActionComponent;
