<img src="https://img.shields.io/circleci/build/github/panoply/liquify/circleci-project-setup?token=54a787fdd39139be0add226455eb4d07f34f9d3f&style=flat-square&logo=CircleCI&label=&labelColor=555" align="left" />&nbsp;&nbsp;<img align="left" src="https://img.shields.io/librariesio/release/npm/@liquify/specs?style=flat-square&label=&logoWidth=28&labelColor=555&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCA5LjMzIj48dGl0bGU+bnBtPC90aXRsZT48cGF0aCBkPSJNMCwwVjhINi42N1Y5LjMzSDEyVjhIMjRWMFpNNi42Nyw2LjY2SDUuMzN2LTRINHY0SDEuMzRWMS4zM0g2LjY3Wm00LDBWOEg4VjEuMzNoNS4zM1Y2LjY2SDEwLjY3Wm0xMiwwSDIxLjM0di00SDIwdjRIMTguNjd2LTRIMTcuMzR2NEgxNC42N1YxLjMzaDhabS0xMi00SDEyVjUuMzNIMTAuNjZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+" />

# @liquify/cryptographer

Cryptographer with IV used for encryption and decrytption of various data types with [crypto](#). Uses an [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithm and supports multiple ciphers.

## Why?

Liquify operates on a freemium license model. Some parts of the codebase can be consumed via the public NPM registry which exposes closed source code and data. This module facilitates encryption so proprietary code and/or data becomes enigmatic so as to prevent reverse engineering without capable context.

## Install

```cli
<pnpm|npm|yarn> i @liquify/cryptographer --save-dev
```

## Usage

```js
import cryptographer from "@liquify/cryptographer";

const crypto = cryptographer("secret", "aes-256-ctr");

// Encoding
crypto.encode({ foo: "bar" });

// Decoding
crypto.decode("12345678910abcdefghijkmnopqrstuvwxyz");

// Ciphers
cryptor.ciphers();

// Hash
crypto.hash("secret", "md5");
```

## Ciphers

- aes-256-cbc
- aes-256-cbc-hmac-sha1
- aes-256-cbc-hmac-sha256
- aes-256-cfb
- aes-256-cfb1
- aes-256-cfb8
- aes-256-ctr
- aes-256-ofb
- aes256
- camellia256

## Contributing

This package licensed under MIT but it exists as part of a monorepo that is closed source. Currently, any contributions, issues and/or feature requests by end users is not possible.

## Author

🥛 <small>Laced with [Vellocet](#) by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small> <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
