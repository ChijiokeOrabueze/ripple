import { Schema } from "mongoose";
import { IAudit, auditSchema } from "./shared";
import { model } from "mongoose";

export interface ITriggerParam {
  name: string;
}

export interface ITrigger extends IAudit {
  url: string;
  name: string;
  params: ITriggerParam[];
}

const triggerParamSchema = new Schema<ITriggerParam>(
  {
    name: { type: String, required: true },
  },
  { _id: false }
);

const triggerSchema = new Schema<ITrigger>({
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  params: [triggerParamSchema],
}).add(auditSchema);

export const Trigger = model<ITrigger>("Trigger", triggerSchema);
