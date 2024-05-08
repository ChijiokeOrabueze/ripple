import {
  CustomErrorBody,
  DynamicCustomErrorMap,
  StaticCustomErrorMap,
} from "../types/global";

export const customSystemError: CustomErrorBody = {
  status: 500,
  message:
    "Something went wrong while trying to process your request. Please try again",
};

export const staticCustomErrorMap: StaticCustomErrorMap = {
  systemError: customSystemError,
  notFound: {
    status: 404,
    message: "Requested resource not found",
  },
  forbidden: {
    status: 403,
    message: "Access to requested resource is forbidden",
  },
  unauthorized: {
    status: 401,
    message: "Unauthorized to access requested resource",
  },
  unauthorizedForAction: {
    status: 401,
    message: "Unauthorized to perform requested action",
  },
  invalidCredentials: {
    status: 401,
    message: "Invalid credentials",
  },
  incompleteTriggerParams: {
    status: 403,
    message: "Incomplete trigger params",
  },
  incompatibleTriggerAction: {
    status: 403,
    message: "Trigger and action is incompatible",
  },
};

export const dynamicCustomErrorMap: DynamicCustomErrorMap = {
  itemNotFound: (field) => ({ message: `${field} not found`, status: 404 }),
  invalidItem: (field) => ({ message: `Invalid ${field}`, status: 400 }),
  alreadyExists: (field) => ({
    message: `${field} already exists`,
    status: 400,
  }),
};
