import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

export const SendMessageFunctionDefinition = DefineFunction({
  callback_id: "send_message",
  title: "Send a message",
  description: "Send a message",
  source_file: "functions/send_message.ts",
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
  output_parameters: {
    properties: {},
    required: [],
  },
});

export default SlackFunction(
  SendMessageFunctionDefinition,
  async ({ inputs, env, token }) => {
    const { new_channel_id, new_channel_name } = inputs;
    const prefix = env["channel-prefix"] ?? "";
    const notify_channel_id = env["notify-channel-id"] ?? "";

    if (!new_channel_name.startsWith(prefix)) {
      return { outputs: {} };
    }
    if (notify_channel_id.length == 0) {
      return { outputs: {} };
    }

    let message = `:new: New`;
    if (prefix.length > 0) {
      message += ` \`#${prefix}\` `;
    }
    message += `channel created: <#${new_channel_id}>`;

    const client = SlackAPI(token);
    await client.chat.postMessage({
      channel: notify_channel_id,
      text: message,
    });

    return { outputs: {} };
  },
);
