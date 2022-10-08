import { Trigger } from "deno-slack-api/types.ts";
import NotifyWorkflow from "../workflows/notify.ts";

const notifyTrigger: Trigger<typeof NotifyWorkflow.definition> = {
  type: "event",
  name: "Notify channel renamed",
  description: "Notify channel renamed",
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
    event_type: "slack#/events/channel_renamed",
  },
};

export default notifyTrigger;
