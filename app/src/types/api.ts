export type ActionParam = {
  name: string;
  value: string;
};

export type Action = {
  id: string;
  url: string;
  name: string;
  params: ActionParam[];
};

export type WorkflowAction = {
  action: Action;
  order: number;
};

export type TriggerParam = {
  name: string;
};

export type Trigger = {
  id: string;
  url: string;
  name: string;
  params: TriggerParam[];
};

export type Validity = {
  validFrom: Date;
  validTo: Date | null;
};

export type Workflow = Validity & {
  id: string;
  name: string;
  trigger: Trigger;
  actions: WorkflowAction[];
};

export type ActionRequest = {
  url: string;
  name: string;
  params: ActionParam[];
  order: number;
};
