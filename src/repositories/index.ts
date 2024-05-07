import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { Filter, Op, PopulatePath } from "./types";

export abstract class Repo<T, K = unknown> {
  protected readonly model: Model<T>;
  private readonly populatePaths: PopulatePath[] = [];
  constructor(model: Model<T>, populatePaths?: PopulatePath[]) {
    this.model = model;
    if (populatePaths) this.populatePaths = populatePaths;
  }

  findAll = async () => {
    await this.model.find();
  };

  create = async (data: T[]) => {
    return this.toBulkExternal(
      await this.model.insertMany(data, { lean: true })
    );
  };

  findMany = async (filters?: Filter<T>[]) => {
    return this.toBulkExternal(
      await this.model.find(this.buildQuery(filters)).lean()
    );
  };

  updateOne = async (updates: UpdateQuery<T>, filters?: Filter<T>[]) => {
    return this.toExternal(
      await this.model
        .findOneAndUpdate(this.buildQuery(filters), updates, { new: true })
        .lean()
    );
  };

  findManyAndPopulate = async (filters?: Filter<T>[]) => {
    const resolvedPaths = this.populatePaths.map((path) => {
      if (typeof path === "string") {
        return {
          path,
        };
      }

      return {
        path: path.pathName,
        populate: path.innerPaths.map((innerPath) => ({ path: innerPath })),
      };
    });
    return this.toBulkExternal(
      await this.model
        .find(this.buildQuery(filters))
        .populate<K>(resolvedPaths)
        .lean()
    );
  };

  private toBulkExternal = <T extends { _id: unknown }>(data: T[]) => {
    return data.map((record) => this.toExternal(record));
  };

  private toExternal = <T extends { _id: unknown }>({ _id, ...others }: T) => {
    return { ...others, id: _id as string };
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
