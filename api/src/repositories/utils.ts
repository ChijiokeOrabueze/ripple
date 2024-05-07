import { Types } from "mongoose";

export const generateId = (idString?: string) => new Types.ObjectId(idString);
