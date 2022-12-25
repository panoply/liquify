**Default** `liquidrc`

💁🏽‍♀️ &nbsp;&nbsp; Recommended setting is `liquidrc`

The configuration method to use. This option defaults to `liquidrc` which means it will look for a `.liquidrc` or `.liquidrc.json` file contained in your projects root directory (or relative to the `liquid.config.baseUrl` if provided).

If you set this to `workspace` then the extension will expect settings to be defined within your `.vscode/settings.json` workspace file or if you are not using a project based workspace setting (`.vscode/settings.json`) file then it will look at global workspace (User Preference) settings.

