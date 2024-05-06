import { Schema, Types } from "mongoose";
import { IAudit, auditSchema } from "./shared";
import { model } from "mongoose";

export interface IAction extends IAudit {
  url: string;
  name: string;
  trigger: Types.ObjectId;
  order: number;
}

const actionSchema = new Schema<IAction>({
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  trigger: { type: Schema.Types.ObjectId, ref: "Trigger" },
  order: { type: Number, unique: true },
}).add(auditSchema);

export const Action = model<IAction>("Action", actionSchema);
