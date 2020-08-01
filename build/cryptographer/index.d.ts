export default interface Options {
  /**
   * Keychain state - maintains decryption codes,
   * master key will unlock all variations, passwords
   */
  keychain(
    master: string,
    passwords: {
      jekyll?: string[];
      shopify?: string[];
      eleventy?: string[];
    }
  ): void;
}
