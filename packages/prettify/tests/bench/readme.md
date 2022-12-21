# Benchmarks

This directory contains some basic benchmark comparisons for Prettify.

# Comparisons

Below are some basic benchmark comparisons that compare different formatting tools. Prettier performs the lowest in every single benchmark.

### HTML

Repeated runs. Fastest is JSBeautify. Prettier is the slowest.

| Lines | Tool       | Result                                   |
| ----- | ---------- | ---------------------------------------- |
| 1k    | JSBeautify | x 348 ops/sec ±0.19% (95 runs sampled)   |
| 1k    | Prettify   | x 111 ops/sec ±2.20% (82 runs sampled)   |
| 1k    | PrettyDiff | x 93.11 ops/sec ±1.23% (81 runs sampled) |
| 1k    | Prettier   | x 36.75 ops/sec ±9.77% (52 runs sampled) |

Runtime parse + beautification. Prettify is the fastest. Prettier is the slowest.

| Lines | Tool       | Result     |
| ----- | ---------- | ---------- |
| 1k    | Prettify   | x 3.41ms   |
| 1k    | JSBeautify | x 9.48ms   |
| 1k    | PrettyDiff | x 34.177ms |
| 1k    | Prettier   | x 30.655ms |

### CSS

TODO

### JavaScript

TODO

### TypeScript

TODO
