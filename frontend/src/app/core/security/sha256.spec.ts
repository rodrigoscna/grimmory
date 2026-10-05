import {describe, expect, it} from 'vitest';

import {sha256} from './sha256';

const hexDigest = (message: Uint8Array) =>
  Array.from(sha256(message), byte => byte.toString(16).padStart(2, '0')).join('');

const hexDigestOf = (text: string) => hexDigest(new TextEncoder().encode(text));

describe('sha256', () => {
  // Test vectors from FIPS 180-2, Appendix B, and the empty message.
  it('hashes the empty message', () => {
    expect(hexDigestOf('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  });

  it('hashes a one-block message', () => {
    expect(hexDigestOf('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });

  it('hashes a message whose padding needs a second block', () => {
    expect(hexDigestOf('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'))
      .toBe('248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1');
  });

  it('hashes a million-byte message', () => {
    expect(hexDigestOf('a'.repeat(1_000_000)))
      .toBe('cdc76e5c9914fb9281a1c7e284d73e67f1809a48a497200e046d39ccc7112cd0');
  });
});
