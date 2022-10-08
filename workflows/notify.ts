import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { SendMessageFunctionDefinition } from "../functions/send_message.ts";

const NotifyWorkflow = DefineWorkflow({
  callback_id: "notify_workflow",
  title: "Notify new channel",
  description: "Notify new channel",
  input_parameters: {
    properties: {
      new_channel_id: {
        type: Schema.types.string,
      },
      new_channel_name: {
        type: Schema.types.string,
      },
    },
    required: ["new_channel_id", "new_channel_name"],
  },
});

NotifyWorkflow.addStep(SendMessageFunctionDefinition, {
  new_channel_id: NotifyWorkflow.inputs.new_channel_id,
  new_channel_name: NotifyWorkflow.inputs.new_channel_name,
});

export default NotifyWorkflow;
