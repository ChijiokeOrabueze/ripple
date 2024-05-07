import { Repo } from ".";
import { IAction, Action } from "../db/models/action.model";

export class ActionRepository extends Repo<IAction> {
  constructor() {
    super(Action);
  }
}
