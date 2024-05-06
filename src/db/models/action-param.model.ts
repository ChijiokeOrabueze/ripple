import { Schema, Types } from "mongoose";
import { IAudit, auditSchema } from "./shared";
import { model } from "mongoose";

export interface IActionParam extends IAudit {
  name: string;
  value: string;
  action: Types.ObjectId;
}

const actionParamSchema = new Schema<IActionParam>({
  name: { type: String, required: true },
  value: { type: String, required: true },
  action: { type: Schema.Types.ObjectId, ref: "Action" },
}).add(auditSchema);

export const ActionParam = model<IActionParam>(
  "ActionParam",
  actionParamSchema
);
