import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import SendMessage from "./send_message.ts";

const { createContext } = SlackFunctionTester("send_message");

Deno.test("channel_name_does_not_match_prefix", async () => {
  const inputs = {
    new_channel_id: "NEW_CHANNEL_ID",
    new_channel_name: "new-channel",
  };
  const env = {
    "notify-channel-id": "NOTIFY_CHANNEL_ID",
    "channel-prefix": "prefix-",
  };
  const { outputs } = await SendMessage(
    createContext({ inputs, env }),
  );
  assertEquals(outputs?.notified, false);
  assertEquals(outputs?.message, "does not match prefix");
});

Deno.test("notify_channel_id_is_empty", async () => {
  const inputs = {
    new_channel_id: "NEW_CHANNEL_ID",
    new_channel_name: "new-channel",
  };
  const env = {
    "channel-prefix": "new-",
  };
  const { outputs } = await SendMessage(
    createContext({ inputs, env }),
  );
  assertEquals(outputs?.notified, false);
  assertEquals(outputs?.message, "notify-channel-id is empty");
});

Deno.test("channel_prefix_is_empty", async () => {
  const inputs = {
    new_channel_id: "NEW_CHANNEL_ID",
    new_channel_name: "new-channel",
  };
  const env = {
    "notify-channel-id": "NOTIFY_CHANNEL_ID",
  };
  const { outputs } = await SendMessage(
    createContext({ inputs, env }),
  );
  assertEquals(outputs?.notified, true);
  assertEquals(
    outputs?.message,
    ":new: New channel created: <#NEW_CHANNEL_ID>",
  );
});

Deno.test("channel_name_matches_prefix", async () => {
  const inputs = {
    new_channel_id: "NEW_CHANNEL_ID",
    new_channel_name: "new-channel",
  };
  const env = {
    "notify-channel-id": "NOTIFY_CHANNEL_ID",
    "channel-prefix": "new-",
  };
  const { outputs } = await SendMessage(
    createContext({ inputs, env }),
  );
  assertEquals(outputs?.notified, true);
  assertEquals(
    outputs?.message,
    ":new: New `#new-` channel created: <#NEW_CHANNEL_ID>",
  );
});
