import rollup from "rollup";

interface Options {
  /**
   * The IV password used for decoding the encrypted JSON
   */
  readonly password: string;
  /**
   * The encryption cipher
   */
  readonly cipher?:
    | "aes-256-cbc"
    | "aes-256-cbc-hmac-sha1"
    | "aes-256-cbc-hmac-sha256"
    | "aes-256-cfb"
    | "aes-256-cfb1"
    | "aes-256-cfb8"
    | "aes-256-ctr"
    | "aes-256-ofb"
    | "aes256"
    | "camellia-256-cbc"
    | "camellia-256-cfb"
    | "camellia-256-cfb1"
    | "camellia-256-cfb8"
    | "camellia-256-ofb"
    | "camellia256";
}

/**
 * Cryptospec Rollup plugin used by the Liquify IDE plugin which will
 * encrypt JSON input files.
 */
export default function cryptospec(options: Options): rollup.Plugin;
