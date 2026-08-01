const MD5_BLOCK_SIZE = 64;

/**
 * Convert text to its standard UTF-8 representation while allowing callers
 * such as the file hasher to provide raw bytes without another encoding pass.
 *
 * @param {string | Uint8Array} value
 * @returns {Uint8Array}
 */
function toBytes(value) {
  return typeof value === "string" ? new TextEncoder().encode(value) : value;
}

function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xffff);
}

function bitRotateLeft(value, count) {
  return (value << count) | (value >>> (32 - count));
}

function md5Common(q, a, b, word, shift, constant) {
  return safeAdd(
    bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(word, constant)), shift),
    b,
  );
}

function md5F(a, b, c, d, word, shift, constant) {
  return md5Common((b & c) | (~b & d), a, b, word, shift, constant);
}

function md5G(a, b, c, d, word, shift, constant) {
  return md5Common((b & d) | (c & ~d), a, b, word, shift, constant);
}

function md5H(a, b, c, d, word, shift, constant) {
  return md5Common(b ^ c ^ d, a, b, word, shift, constant);
}

function md5I(a, b, c, d, word, shift, constant) {
  return md5Common(c ^ (b | ~d), a, b, word, shift, constant);
}

function wordToHex(value) {
  let result = "";
  for (let index = 0; index < 4; index++) {
    result += ((value >>> (index * 8)) & 0xff).toString(16).padStart(2, "0");
  }
  return result;
}

/**
 * Calculate an RFC 1321 MD5 digest over UTF-8 text or an exact byte sequence.
 * The input is processed block-by-block so file bytes are never converted to a
 * JavaScript string and the MD5 length field retains all 64 bits.
 *
 * @param {string | Uint8Array} input
 * @returns {string} Lowercase hexadecimal digest.
 */
export function md5(input) {
  const bytes = toBytes(input);
  const bitLength = BigInt(bytes.length) * BigInt(8);
  const totalLength = Math.ceil((bytes.length + 9) / MD5_BLOCK_SIZE) * MD5_BLOCK_SIZE;

  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let blockStart = 0; blockStart < totalLength; blockStart += MD5_BLOCK_SIZE) {
    const words = new Int32Array(16);

    for (let offset = 0; offset < MD5_BLOCK_SIZE; offset++) {
      const position = blockStart + offset;
      let byte = 0;

      if (position < bytes.length) {
        byte = bytes[position];
      } else if (position === bytes.length) {
        byte = 0x80;
      } else if (position >= totalLength - 8) {
        const lengthByte = position - (totalLength - 8);
        byte = Number((bitLength >> (BigInt(lengthByte) * BigInt(8))) & BigInt(0xff));
      }

      words[offset >> 2] |= byte << ((offset & 3) * 8);
    }

    const originalA = a;
    const originalB = b;
    const originalC = c;
    const originalD = d;

    a = md5F(a, b, c, d, words[0], 7, -680876936); d = md5F(d, a, b, c, words[1], 12, -389564586);
    c = md5F(c, d, a, b, words[2], 17, 606105819); b = md5F(b, c, d, a, words[3], 22, -1044525330);
    a = md5F(a, b, c, d, words[4], 7, -176418897); d = md5F(d, a, b, c, words[5], 12, 1200080426);
    c = md5F(c, d, a, b, words[6], 17, -1473231341); b = md5F(b, c, d, a, words[7], 22, -45705983);
    a = md5F(a, b, c, d, words[8], 7, 1770035416); d = md5F(d, a, b, c, words[9], 12, -1958414417);
    c = md5F(c, d, a, b, words[10], 17, -42063); b = md5F(b, c, d, a, words[11], 22, -1990404162);
    a = md5F(a, b, c, d, words[12], 7, 1804603682); d = md5F(d, a, b, c, words[13], 12, -40341101);
    c = md5F(c, d, a, b, words[14], 17, -1502002290); b = md5F(b, c, d, a, words[15], 22, 1236535329);

    a = md5G(a, b, c, d, words[1], 5, -165796510); d = md5G(d, a, b, c, words[6], 9, -1069501632);
    c = md5G(c, d, a, b, words[11], 14, 643717713); b = md5G(b, c, d, a, words[0], 20, -373897302);
    a = md5G(a, b, c, d, words[5], 5, -701558691); d = md5G(d, a, b, c, words[10], 9, 38016083);
    c = md5G(c, d, a, b, words[15], 14, -660478335); b = md5G(b, c, d, a, words[4], 20, -405537848);
    a = md5G(a, b, c, d, words[9], 5, 568446438); d = md5G(d, a, b, c, words[14], 9, -1019803690);
    c = md5G(c, d, a, b, words[3], 14, -187363961); b = md5G(b, c, d, a, words[8], 20, 1163531501);
    a = md5G(a, b, c, d, words[13], 5, -1444681467); d = md5G(d, a, b, c, words[2], 9, -51403784);
    c = md5G(c, d, a, b, words[7], 14, 1735328473); b = md5G(b, c, d, a, words[12], 20, -1926607734);

    a = md5H(a, b, c, d, words[5], 4, -378558); d = md5H(d, a, b, c, words[8], 11, -2022574463);
    c = md5H(c, d, a, b, words[11], 16, 1839030562); b = md5H(b, c, d, a, words[14], 23, -35309556);
    a = md5H(a, b, c, d, words[1], 4, -1530992060); d = md5H(d, a, b, c, words[4], 11, 1272893353);
    c = md5H(c, d, a, b, words[7], 16, -155497632); b = md5H(b, c, d, a, words[10], 23, -1094730640);
    a = md5H(a, b, c, d, words[13], 4, 681279174); d = md5H(d, a, b, c, words[0], 11, -358537222);
    c = md5H(c, d, a, b, words[3], 16, -722521979); b = md5H(b, c, d, a, words[6], 23, 76029189);
    a = md5H(a, b, c, d, words[9], 4, -640364487); d = md5H(d, a, b, c, words[12], 11, -421815835);
    c = md5H(c, d, a, b, words[15], 16, 530742520); b = md5H(b, c, d, a, words[2], 23, -995338651);

    a = md5I(a, b, c, d, words[0], 6, -198630844); d = md5I(d, a, b, c, words[7], 10, 1126891415);
    c = md5I(c, d, a, b, words[14], 15, -1416354905); b = md5I(b, c, d, a, words[5], 21, -57434055);
    a = md5I(a, b, c, d, words[12], 6, 1700485571); d = md5I(d, a, b, c, words[3], 10, -1894986606);
    c = md5I(c, d, a, b, words[10], 15, -1051523); b = md5I(b, c, d, a, words[1], 21, -2054922799);
    a = md5I(a, b, c, d, words[8], 6, 1873313359); d = md5I(d, a, b, c, words[15], 10, -30611744);
    c = md5I(c, d, a, b, words[6], 15, -1560198380); b = md5I(b, c, d, a, words[13], 21, 1309151649);
    a = md5I(a, b, c, d, words[4], 6, -145523070); d = md5I(d, a, b, c, words[11], 10, -1120210379);
    c = md5I(c, d, a, b, words[2], 15, 718787259); b = md5I(b, c, d, a, words[9], 21, -343485551);

    a = safeAdd(a, originalA);
    b = safeAdd(b, originalB);
    c = safeAdd(c, originalC);
    d = safeAdd(d, originalD);
  }

  return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index++) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
}

function concatBytes(first, second) {
  const result = new Uint8Array(first.length + second.length);
  result.set(first);
  result.set(second, first.length);
  return result;
}

/**
 * Calculate HMAC-MD5 according to RFC 2104/RFC 2202.
 *
 * @param {string | Uint8Array} key
 * @param {string | Uint8Array} message
 * @returns {string} Lowercase hexadecimal MAC.
 */
export function hmacMd5(key, message) {
  let keyBytes = toBytes(key);
  const messageBytes = toBytes(message);

  if (keyBytes.length > MD5_BLOCK_SIZE) {
    keyBytes = hexToBytes(md5(keyBytes));
  }

  const paddedKey = new Uint8Array(MD5_BLOCK_SIZE);
  paddedKey.set(keyBytes);

  const innerPad = new Uint8Array(MD5_BLOCK_SIZE);
  const outerPad = new Uint8Array(MD5_BLOCK_SIZE);
  for (let index = 0; index < MD5_BLOCK_SIZE; index++) {
    innerPad[index] = paddedKey[index] ^ 0x36;
    outerPad[index] = paddedKey[index] ^ 0x5c;
  }

  const innerDigest = hexToBytes(md5(concatBytes(innerPad, messageBytes)));
  return md5(concatBytes(outerPad, innerDigest));
}
