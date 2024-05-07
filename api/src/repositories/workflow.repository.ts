import { Repo } from ".";
import {
  IWorkflow,
  Workflow,
  WorkflowPopulate,
} from "../db/models/workflow.model";

export class WorkflowRepository extends Repo<IWorkflow, WorkflowPopulate> {
  constructor() {
    super(Workflow, [
      "trigger",
      { pathName: "actions", innerPaths: ["action"] },
    ]);
  }
}
