# @liquify/release

Automated package releases for projects contained across the [Liquify](https://liquify.dev) monorepo workspace.

### Why?

### Install

```bash
pnpm add @liquify/highlight ava -D
```

# Usage

The `publish` command can be executed across the monorepo workspace. Where `<name>` is the portion of the package name following `@liquify/` (eg: `liquid-parser`).

```bash

pnpm publish <name> [flags]

```

### Operations

The `publish` script performs the following actions:

1. Gathers commits from the last release tag
2. Determines the next appropriate version bump (major, minor, or patch)
3. Updates `package.json`
4. Generates a new ChangeLog entry
5. Updates `changelog.md` for the target plugin
6. Commits `package.json` and `changelog.md`, with a commit message in the form `release: <name>-v<version>`
7. Publishes to NPM
8. Tags the release in the form `<name>-v<version>` (eg: `liquid-parser-v0.1.0`)
9. Pushes the commit and tag to Github

### Flags

The following flags are available to modify the publish process:

```bash

--dry                   # Tells the script to perform a dry-run
--major                 # Used to force a major semver bump.
--minor                 # Used to force a minor semver bump.
--patch                 # Used to force a patch semver bump.
--no-push               # Instruct the script not to push changes and tags to Git.
--no-tag                # Instruct the script not to tag the release.

```

### Credits

Most of this logic was lifted for the [rollup/plugins](https://github.com/rollup/plugins) monorepo.
