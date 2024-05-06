import { Schema } from "mongoose";

export interface IAudit {
  createdBy: string;
  updatedBy: string | null;
  validFrom: Date;
  validTo: Date | null;
}

export const auditSchema = new Schema<IAudit>(
  {
    createdBy: { type: String, default: "System" },
    updatedBy: { type: String },
    validFrom: { type: Date, default: () => new Date() },
    validTo: { type: Date },
  },
  { timestamps: true }
);
