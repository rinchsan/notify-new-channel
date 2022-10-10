# notify-new-channel

Notify new channel created/renamed on new Slack platform

## Getting started

Deploy and create triggers.

```sh
slack deploy
slack trigger create --trigger-def "triggers/channel_created.ts"
slack trigger create --trigger-def "triggers/channel_renamed.ts"
```

Set environment variables.

```sh
slack env add notify-channel-id [CHANNEL_ID_TO_NOTIFY]
slack env add channel-prefix [CHANNEL_PREFIX_TO_NOTIFY]
```

## Run Test

```sh
make test
```
