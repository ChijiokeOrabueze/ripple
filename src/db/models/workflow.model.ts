import { Types, model } from "mongoose";
import { IAudit, auditSchema } from "./shared";
import { Schema } from "mongoose";

export interface IWorkflowAction {
  action: Types.ObjectId;
  order: number;
}

export interface IWorkflow extends IAudit {
  name?: string;
  trigger: Types.ObjectId;
  actions: IWorkflowAction[];
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
