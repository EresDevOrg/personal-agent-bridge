# `@ubiquity-os/personal-agent-bridge`

The Personal Agent Bridge is a [UbiquityOS](https://github.com/apps/ubiquity-os) plugin designed to enable seamless interaction between [UbiquityOS](https://github.com/apps/ubiquity-os) and a [Personal Agent plugin](https://github.com/EresDevOrg/personal-agent) hosted on a user's GitHub account. It detects any comment beginning with `/@username` and relays it to the mentioned user's personal-agent for further handling. Detailed documentation about the operations of the personal-agent can be found [here](https://github.com/EresDevOrg/personal-agent/blob/development/README.md).

## Usage

This plugin serves exclusively as a bridge between UbiquityOS and the Personal Agent. For example, the following issue comment triggers this plugin:

```
/@username review my pull request
```

Here, `username` must correspond to a GitHub user who has set up their own fork of the Personal Agent plugin. To see the system in action, you need to deploy the [Personal Agent plugin](https://github.com/EresDevOrg/personal-agent) and follow its setup and usage instructions.

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
