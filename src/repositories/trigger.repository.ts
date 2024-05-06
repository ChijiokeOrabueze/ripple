import { Repo } from ".";
import { ITrigger, Trigger } from "../db/models/trigger.model";

export class TriggerRepository extends Repo<ITrigger> {
  constructor() {
    super(Trigger);
  }
}
