import { Types, model } from "mongoose";
import { IAudit, auditSchema } from "./shared";
import { Schema } from "mongoose";
import { ITrigger } from "./trigger.model";
import { IAction } from "./action.model";

export interface IWorkflowAction {
  action: Types.ObjectId;
  order: number;
}

export interface IWorkflow extends IAudit {
  name?: string;
  trigger: Types.ObjectId;
  actions: IWorkflowAction[];
}

export interface WorkflowPopulate {
  trigger: ITrigger & { _id: string };
  actions: { action: IAction & { _id: string }; order: number }[];
}

const WorkflowActionSchema = new Schema<IWorkflowAction>({
  action: { type: Schema.Types.ObjectId, ref: "Action" },
  order: { type: Number, unique: true },
});

const WorkflowSchema = new Schema<IWorkflow>({
  name: { type: String, unique: true },
  trigger: { type: Schema.Types.ObjectId, ref: "Trigger" },
  actions: [WorkflowActionSchema],
}).add(auditSchema);

export const Workflow = model<IWorkflow>("Workflow", WorkflowSchema);
