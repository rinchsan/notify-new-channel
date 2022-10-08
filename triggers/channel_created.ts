import { Trigger } from "deno-slack-api/types.ts";
import NotifyWorkflow from "../workflows/notify.ts";

const notifyTrigger: Trigger<typeof NotifyWorkflow.definition> = {
  type: "event",
  name: "Notify channel created",
  description: "Notify channel created",
  workflow: "#/workflows/notify_workflow",
  inputs: {
    new_channel_id: {
      value: "{{data.channel_id}}",
    },
    new_channel_name: {
      value: "{{data.channel_name}}",
    },
  },
  event: {
    event_type: "slack#/events/channel_created",
  },
};

export default notifyTrigger;
