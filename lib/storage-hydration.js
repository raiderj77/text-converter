import { useRef } from "react";

/**
 * A per-component gate that prevents persistence effects from overwriting
 * browser storage before the corresponding restore has completed.
 */
export function useStorageHydrationGate() {
  return useRef(false);
}

/**
 * Read a local-storage value without letting disabled or unavailable browser
 * storage break the owning component. The accessor argument keeps failure
 * behavior directly testable without mutating the global environment.
 */
export function safeGetLocalStorage(
  key,
  getStorage = () => globalThis.localStorage,
) {
  try {
    return getStorage()?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

/**
 * Remove a local-storage value without letting blocked storage access break
 * page hydration or privacy cleanup.
 */
export function safeRemoveLocalStorage(
  key,
  getStorage = () => globalThis.localStorage,
) {
  try {
    getStorage()?.removeItem(key);
    return true;
  } catch {
    return false;
  }
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
    } catch {
      // Corrupt or unavailable browser storage should fall back to defaults.
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
  try {
    persist();
    return true;
  } catch {
    return false;
  }
}
