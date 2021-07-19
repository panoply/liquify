/**
 * Looks for match within values
 */
export function documentation (
  description: string,
  reference: { name: string, url: string }
): {
  kind: 'plaintext' | 'markdown',
  value: string
} {

  if (!description && !reference?.name) return { kind: 'plaintext', value: '' };

  if (!reference?.name) return { kind: 'plaintext', value: '' };

  const value = description +
    '\n\n' +
    '[' + reference.name + ']' +
    '(' + reference.url + ')';

  return { kind: 'markdown', value };

};

/**
 * Looks for match within values
 */
export function descriptive (value: string): {
  kind: 'plaintext' | 'markdown',
  value: string
} {

  if (!value) return { kind: 'plaintext', value: '' };

  return { kind: 'markdown', value };

};
