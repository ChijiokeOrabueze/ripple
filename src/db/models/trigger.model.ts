import { Schema } from "mongoose";
import { IAudit, auditSchema } from "./shared";
import { model } from "mongoose";

export interface ITrigger extends IAudit {
  url: string;
  name: string;
}

const triggerSchema = new Schema<ITrigger>({
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
}).add(auditSchema);

export const Trigger = model<ITrigger>("Trigger", triggerSchema);
