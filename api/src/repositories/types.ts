export type Op = "eq" | "gte" | "neq" | "gt" | "lt" | "lte";

export type Filter<T> = {
  field: "id" | keyof T;
  value: string | number | null;
  op?: Op;
};

export type PopulatePath = string | { pathName: string; innerPaths: string[] };
