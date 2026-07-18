const ZERO = BigInt(0);
const ONE = BigInt(1);
const UINT64_SIZE = ONE << BigInt(64);

type FillRandomValues = (values: Uint32Array) => Uint32Array;

function browserRandomValues(values: Uint32Array): Uint32Array {
  return globalThis.crypto.getRandomValues(values);
}

/**
 * Return an unbiased, cryptographically strong bigint in the inclusive range.
 * Rejection sampling prevents the modulo bias caused when the range does not
 * divide the 64-bit source space evenly.
 */
export function secureRandomBigInt(
  min: bigint,
  max: bigint,
  fillRandomValues: FillRandomValues = browserRandomValues,
): bigint {
  const span = max - min + ONE;
  if (span <= ZERO || span > UINT64_SIZE) {
    throw new RangeError("Random range must contain between 1 and 2^64 values.");
  }

  const unbiasedLimit = UINT64_SIZE - (UINT64_SIZE % span);
  const words = new Uint32Array(2);

  while (true) {
    fillRandomValues(words);
    const candidate = (BigInt(words[0]) << BigInt(32)) | BigInt(words[1]);
    if (candidate < unbiasedLimit) {
      return min + (candidate % span);
    }
  }
}

export function secureRandomInt(min: number, max: number): number {
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min > max) {
    throw new RangeError("Minimum and maximum must be safe integers with minimum no greater than maximum.");
  }

  return Number(secureRandomBigInt(BigInt(min), BigInt(max)));
}

/**
 * Sample without replacement using a sparse partial Fisher-Yates shuffle.
 * The map stores only the positions touched, so even very large ranges use
 * memory proportional to the requested count instead of the full range.
 */
export function secureUniqueIntegers(min: number, max: number, count: number): number[] {
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min > max) {
    throw new RangeError("Minimum and maximum must be safe integers with minimum no greater than maximum.");
  }
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new RangeError("Count must be a non-negative safe integer.");
  }

  const range = BigInt(max) - BigInt(min) + ONE;
  const requested = BigInt(count);
  if (requested > range) {
    throw new RangeError("Count cannot exceed the number of unique values in the range.");
  }

  const swaps = new Map<bigint, bigint>();
  const results: number[] = [];

  for (let index = ZERO; index < requested; index += ONE) {
    const selectedIndex = secureRandomBigInt(index, range - ONE);
    const selectedValue = swaps.get(selectedIndex) ?? selectedIndex;
    const currentValue = swaps.get(index) ?? index;
    swaps.set(selectedIndex, currentValue);
    results.push(Number(BigInt(min) + selectedValue));
  }

  return results;
}
