# `@ubiquity-os/personal-agent-bridge`

Personal Agent Bridge is a [UbiquityOS](https://github.com/apps/ubiquity-os) plugin that facilitates communication between [UbiquityOS](https://github.com/apps/ubiquity-os) and a [Personal Agent plugin](https://github.com/EresDevOrg/personal-agent) hosted by a user's Github account. It picks up any comment that starts with `/@username` and forwards it to personal-agent of the mentioned user for further processing. What happens at the personal-agent is documented [here](https://github.com/EresDevOrg/personal-agent/blob/development/README.md).

## Usage

The plugin only facilitates communication between UbiquityOS and Personal Agent. An issue comment given below should invoke this plugin.

```
/@username review my pull request
```

where `username` belongs a GitHub user who has set up a fork of Personal Agent plugin.
To see it in action, you should also deploy the [Personal Agent Plugin](https://github.com/EresDevOrg/personal-agent) and follow its usage instructions.

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
