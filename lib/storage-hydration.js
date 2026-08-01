import { useRef } from "react";

/**
 * A per-component gate that prevents persistence effects from overwriting
 * browser storage before the corresponding restore has completed.
 */
export function useStorageHydrationGate() {
  return useRef(false);
}

/**
 * Apply an already-captured browser-storage value after hydration. Capturing
 * the raw value before this call and opening the gate only after `restore`
 * makes the sequence safe under React Strict Mode's effect rehearsal.
 */
export function deferStorageHydration(gate, restore) {
  const timeout = globalThis.setTimeout(() => {
    try {
      restore();
    } finally {
      gate.current = true;
    }
  }, 0);

  return () => globalThis.clearTimeout(timeout);
}

/**
 * Run a storage write only after the matching restore has completed.
 * Returns whether the write ran, which also makes the sequencing testable.
 */
export function persistAfterStorageHydration(gate, persist) {
  if (!gate.current) return false;
  persist();
  return true;
}
