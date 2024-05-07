import { Schema, Types } from "mongoose";
import { IAudit, auditSchema } from "./shared";
import { model } from "mongoose";

export interface IActionParam {
  name: string;
  value: string;
}

export interface IAction extends IAudit {
  url: string;
  name: string;
  params: IActionParam[];
}

const actionParamSchema = new Schema<IActionParam>(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const actionSchema = new Schema<IAction>({
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  params: [actionParamSchema],
}).add(auditSchema);

export const Action = model<IAction>("Action", actionSchema);
