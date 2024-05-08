import { Action, Workflow } from "@/types/api";
import { WorkflowActionValue, WorkflowComponent } from "@/types/app";

export const convertWorkflowResponseToWorkflowComponents = (
  response: Workflow
): WorkflowComponent[] => {
  const result: WorkflowComponent[] = [];

  result.push({
    type: "trigger",
    selectedValue: response.trigger,
    isDisabled: true,
  });

  response.actions.sort((a, b) => {
    if (typeof a.order === "number" && typeof b.order === "number")
      return a.order - b.order;

    return typeof a.order === "number"
      ? -1
      : typeof b.order === "number"
      ? 1
      : 0;
  });

  response.actions.forEach(({ action }) => {
    result.push({
      type: "action",
      selectedValue: action,
    });
  });

  return result;
};

const actionToString = ({ url, name }: WorkflowActionValue) => `${url}${name}`;

export const isActionChanged = (
  action1?: WorkflowActionValue,
  action2?: WorkflowActionValue
) => {
  if (!action1 && !action2) return false;

  if (!action1 || !action2) return true;

  if (actionToString(action1) !== actionToString(action2)) return true;

  const action1ParamsMap: { [name in string]: string } = {};

  action1.params?.forEach(({ name, value }) => {
    action1ParamsMap[name] = value;
  });

  return action2.params?.some(
    ({ name, value }) =>
      !(name in action1ParamsMap) || value !== action1ParamsMap[name]
  );
};
