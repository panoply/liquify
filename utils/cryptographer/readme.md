# @liquify/cryptographer

Cryptographer with IV for encryption and decryption of various data types with [crypto](https://nodejs.org/api/crypto.html). Uses an [aes-256-gcm](https://en.wikipedia.org/wiki/Galois/Counter_Mode) algorithm and supports multiple ciphers.

## Why?

For encryption/decryption of sensitive data sent across the wire. Some packages in the workspace are operating under a **PROPRIETARY** or **CC BY-NC-ND 4.0** license and considers source code as [Trade Secret](https://en.wikipedia.org/wiki/Proprietary_software#Types).

## Install

```cli
pnpm add @liquify/cryptographer -D
```

## Usage

```ts
import cryptographer from "@liquify/cryptographer";

const crypto = cryptographer(
  secret: "secret"
  , algorithm?: "aes-256-ctr"
  , options?: CipherCCMOptions
);

// Encoding
crypto.encode({ foo: "bar" });

// Decoding, eg: { foo: "bar" }
crypto.decode("12345678910abcdefghijkmnopqrstuvwxyz");

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

### License

Licensed under [MIT](#LICENSE)
