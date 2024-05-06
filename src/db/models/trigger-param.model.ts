import { Schema, Types } from "mongoose";
import { IAudit, auditSchema } from "./shared";
import { model } from "mongoose";

export interface ITriggerParam extends IAudit {
  name: string;
  trigger: Types.ObjectId;
}

const triggerParamSchema = new Schema<ITriggerParam>({
  name: { type: String, required: true, unique: true },
  trigger: { type: Schema.Types.ObjectId, ref: "Trigger" },
}).add(auditSchema);

export const TriggerParam = model<ITriggerParam>(
  "TriggerParam",
  triggerParamSchema
);
