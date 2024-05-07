import { ClientResponse } from "./client.dto";

export interface ClientService {
  runTriggerActions: (
    triggerName: string,
    data: Record<string, string>
  ) => Promise<ClientResponse[]>;
}
