# Prettify Tests

This directory contains the tests for Prettify.

### Peers

- [AVA](https://github.com/avajs/ava)
- [@liquify/ava](#)
- [@liquify/prettify](https://github.com/panoply/prettify)

# Overview

### Snapshot Assertions

Prettify uses [Snapshot Testing](https://github.com/avajs/ava/blob/main/docs/04-snapshot-testing.md) for assertion differences when comparing unformatted and formatted code samples. Sample contents are provided within Plain Text files and can include descriptions which will be passed to AVA's snapshot reports.

# Tests

The tests are split up into 4 different categories:

- [Cases](#Cases)
- [e2e](#e2e)
- [Rules](#Rules)
- [Bench](#Bench)

### Cases

The [cases](/cases) directory contains beautification edge cases. In the context of Prettify, edge cases refer to various code structures that Prettify understands and can reason about with. The [cases/samples](/cases/samples) directory is where the assertions exist and the [cases/snapshots](cases/snapshots) directory is where you can find the snapshot reports.

### e2e

TODO

### Rules

TODO

### Bench

TODO
