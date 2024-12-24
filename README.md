# `@ubiquity-os/personal-agent-bridge`

Personal Agent Bridge is an UbiquityOS plugin that facilitates communication between UbiquityOS and a Personal Agent hosted by a user's Github account. It picks up any comment that starts with `/@username` and forwards it to personal-agent of the mentioned user for further processing. What happens at the personal-agent is documented [here](https://github.com/EresDevOrg/personal-agent/blob/development/README.md).

## Plugin configuration

Add the following to your .ubiquity-os.config.yml file.

```yaml
plugins:
  - skipBotEvents: false
    uses:
      - plugin: ubiquity-os/personal-agent-bridge
```

### Get started with development

- Install dependencies

```
yarn install
```

- Run tests

```
yarn test
```

## More information

The initial discussion about the development of this plugin can be found [here](https://github.com/ubiquity-os/plugins-wishlist/issues/3).
