import { Input } from "@/components/input";
import { Select, SelectOption } from "@/components/select";
import React, { useState } from "react";

export const WorkflowPage = () => {
  const [trigger, setTrigger] = useState<SelectOption>();
  const [url, setUrl] = useState("");
  return (
    <div className="w-full h-full flex">
      <div className="flex-2"></div>

      <div className="h-[100vh] flex-1 border">
        <Select
          label="Select Trigger"
          value={trigger}
          options={[{ name: "trigger1", value: "56" }]}
          onChange={(value) => setTrigger(value)}
        />
        <Input label="Url" value={url} onChange={(value) => setUrl(value)} />
      </div>
    </div>
  );
};
