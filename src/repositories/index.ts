import { FilterQuery, Model } from "mongoose";
import { Filter, Op } from "./types";

export abstract class Repo<T> {
  protected readonly model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  findAll = async () => {
    await this.model.find();
  };

  findMany = async (filters?: Filter<T>[]) => {
    return await this.model.find(this.buildQuery(filters)).lean();
  };

  private eqQueryValue = ({ value }: Filter<T>) => {
    return (
      Array.isArray(value) ? { $in: value } : { $eq: value || null }
    ) as FilterQuery<T>[keyof T];
  };

  private neqQueryValue = ({ value }: Filter<T>) => {
    return (
      Array.isArray(value) ? { $nin: value } : { $neq: value || null }
    ) as FilterQuery<T>[keyof T];
  };

  private queryValue = ({ value, op }: Filter<T>) => {
    return { [this.queryOp(op)]: value } as FilterQuery<T>[keyof T];
  };

  private queryOp = (op: Op) => {
    switch (op) {
      case "eq":
        return "$eq";
      case "neq":
        return "$neq";
      case "gte":
        return "$gte";
      case "lt":
        return "$lt";
      case "gt":
        return "$gt";
      case "lte":
        return "$lte";
      default:
        return "$eq";
    }
  };

  private buildQuery = (filters?: Filter<T>[]) => {
    const query: FilterQuery<T> = {};

    filters.forEach((filter) => {
      const { field, op } = filter;

      const fieldName = field === "id" ? "_id" : field;

      switch (op) {
        case "eq":
          query[fieldName] = this.eqQueryValue(filter);
          break;
        case "neq":
          query[fieldName] = this.neqQueryValue(filter);
          break;
        case "gte":
          query[fieldName] = this.queryValue(filter);
          break;
        case "lt":
          query[fieldName] = this.queryValue(filter);
          break;
        case "gt":
          query[fieldName] = this.queryValue(filter);
          break;
        case "lte":
          query[fieldName] = this.queryValue(filter);
          break;
        default:
          query[fieldName] = this.eqQueryValue(filter);
          break;
      }
    });

    return query;
  };
}
