declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: "development" | "production" | "test";

      ROOT_API_URL: string;
      TRIGGER_ROOT_URL: string;
      WORKFLOW_ROOT_URL: string;
    }
  }
}

export {};
