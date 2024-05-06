export const constructResponse = <T>(
  data: T,
  message: string,
  httpAction?: string
) => {
  return {
    status: "success",
    code: httpAction === "create" ? 201 : 200,
    message,
    data,
  };
};
