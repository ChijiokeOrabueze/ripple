import { toast } from "react-toastify";

export const notify = (type: "error" | "success", message: string) =>
  toast(message, { type, position: "top-center", theme: "colored" });

export const notifyError = (message: string) => notify("error", message);

export const notifySuccess = (message: string) => notify("success", message);
