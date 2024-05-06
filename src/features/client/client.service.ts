export interface ClientService {
  runTriggerActions: (
    triggerName: string,
    data: Record<string, string>
  ) => Promise<void>;
}
