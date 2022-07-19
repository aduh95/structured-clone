/**
 * Creates a deep clone of an object.
 */
export default function structuredClone<T>(
  value: T,
  transfer?: {
    transfer: ReadonlyArray<import("worker_threads").TransferListItem>;
  }
): T;
