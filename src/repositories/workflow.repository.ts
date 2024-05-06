import { Repo } from ".";
import { IWorkflow, Workflow } from "../db/models/workflow.model";

export class WorkflowRepository extends Repo<IWorkflow> {
  constructor() {
    super(Workflow);
  }
}
