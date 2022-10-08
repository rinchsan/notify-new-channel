import { Manifest } from "deno-slack-sdk/mod.ts";
import NotifyWorkflow from "./workflows/notify.ts";

export default Manifest({
  name: "notify-new-channel",
  description: "Notify new channel created/renamed",
  icon: "assets/icon.png",
  workflows: [NotifyWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "channels:read",
  ],
});
