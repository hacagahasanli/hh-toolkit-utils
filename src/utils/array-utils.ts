/**
 * Returns a new array with unique elements based on the specified key.
 * Keeps the first occurrence of each unique key value.
 *
 * @param arr - Array of objects
 * @param key - Key to determine uniqueness
 */
export function uniqueBy<T, K extends keyof T>(arr: T[], key: K): T[] {
  const seen = new Set();
  return arr.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

/**
 * Groups array elements into an object, using the specified key's string value as group keys.
 *
 * @param arr - Array of objects
 * @param key - Key to group by
 */
export function groupBy<T, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Splits an array into chunks of specified size.
 *
 * @param arr - Array to split
 * @param size - Chunk size
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Checks if two arrays are equal by comparing JSON stringified elements.
 * Optionally treats two empty arrays as equal.
 *
 * @param arr1 - First array
 * @param arr2 - Second array
 * @param treatEmptyAsEqual - If true, empty arrays are considered equal
 */
export function checkArrEquality<T>(
  arr1: T[],
  arr2: T[],
  treatEmptyAsEqual: boolean = false
): boolean {
  if (treatEmptyAsEqual && arr1.length === 0 && arr2.length === 0) return true;

  if (arr1.length !== arr2.length && arr1.length !== 0 && arr2.length !== 0)
    return false;

  return arr1.every((obj1, index) => {
    const obj2 = arr2[index];
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  });
}

/**
 * Returns a new array which is the reverse of the input array.
 *
 * @param arr - Array to reverse
 */
export function reverseArr<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

/**
 * Filters an array by rejecting elements that match the predicate.
 * This is the opposite of Array.filter().
 *
 * @param arr - Array to filter
 * @param predicate - Function that returns true for elements to reject
 * @returns New array with rejected elements removed
 */
export function reject<T>(
  arr: T[],
  predicate: (x: T, i: number) => boolean
): T[] {
  type Predicate = typeof predicate;
  const invert = (f: Predicate): Predicate => (x, i) => !f(x, i);
  return arr.filter(invert(predicate));
}

/**
 * Counts the number of elements in an array that match the predicate.
 * If no predicate is provided, returns the array length.
 *
 * @param arr - Array to count elements from
 * @param predicate - Optional function that returns true for elements to count
 * @returns Number of matching elements
 */
export function count<T>(
  arr: T[],
  predicate?: (x: T, i: number) => boolean
): number {
  if (!arr) return 0;
  if (!predicate) return arr.length;

  let counter = 0;

  for (let i = 0; i < arr.length; i += 1) {
    if (predicate(arr[i], i)) counter += 1;
  }

  return counter;
}

/**
 * Conditionally adds an element to an array based on a boolean or function condition.
 * Returns a new array without mutating the original.
 *
 * @param array - Original array
 * @param element - Element to add
 * @param condition - Boolean or function that returns boolean
 * @returns New array with element added if condition is true, otherwise original array
 */
export function pushIf<T>(
  array: T[],
  element: T,
  condition: boolean | (() => boolean)
): T[] {
  if (typeof condition === "boolean" && condition) {
    return [...array, element];
  }

  if (typeof condition === "function" && condition()) {
    return [...array, element];
  }

  return array;
}

/**
 * Returns the first element of an array, or undefined if empty.
 *
 * @param arr - Array to get first element from
 * @returns First element or undefined
 */
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

/**
 * Returns the last element of an array, or undefined if empty.
 *
 * @param arr - Array to get last element from
 * @returns Last element or undefined
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

/**
 * Returns a new array with only unique elements (primitive values).
 *
 * @param arr - Array to filter
 * @returns Array with unique elements
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Flattens a nested array by one level.
 *
 * @param arr - Array to flatten
 * @returns Flattened array
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.flat();
}

/**
 * Flattens a deeply nested array recursively.
 *
 * @param arr - Array to flatten deeply
 * @returns Deeply flattened array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flattenDeep(arr: any[]): any[] {
  return arr.flat(Infinity);
}

/**
 * Returns a new array with all falsy values removed.
 * Falsy values: false, null, 0, "", undefined, NaN
 *
 * @param arr - Array to filter
 * @returns Array without falsy values
 */
export function compactArr<T>(arr: T[]): NonNullable<T>[] {
  return arr.filter(Boolean) as NonNullable<T>[];
}

/**
 * Returns a random element from the array.
 *
 * @param arr - Array to pick from
 * @returns Random element or undefined if array is empty
 */
export function sample<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns n random elements from the array.
 *
 * @param arr - Array to pick from
 * @param n - Number of elements to pick
 * @returns Array of random elements
 */
export function sampleSize<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

/**
 * Shuffles an array randomly (Fisher-Yates algorithm).
 *
 * @param arr - Array to shuffle
 * @returns New shuffled array
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Returns the difference between two arrays (elements in first array not in second).
 *
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Elements in arr1 that are not in arr2
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
}

/**
 * Returns the intersection of two arrays (elements present in both).
 *
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Elements present in both arrays
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => set2.has(item));
}

/**
 * Returns the union of two arrays (all unique elements from both).
 *
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Unique elements from both arrays
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  return unique([...arr1, ...arr2]);
}

/**
 * Removes elements from an array based on values.
 *
 * @param arr - Array to filter
 * @param values - Values to remove
 * @returns New array without specified values
 */
export function without<T>(arr: T[], ...values: T[]): T[] {
  const valuesSet = new Set(values);
  return arr.filter((item) => !valuesSet.has(item));
}

/**
 * Zips multiple arrays into an array of tuples.
 *
 * @param arrays - Arrays to zip
 * @returns Array of tuples
 */
export function zip<T>(...arrays: T[][]): T[][] {
  const maxLength = Math.max(...arrays.map((arr) => arr.length));
  const result: T[][] = [];

  for (let i = 0; i < maxLength; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }

  return result;
}

/**
 * Creates an object from an array of key-value pairs.
 *
 * @param pairs - Array of [key, value] pairs
 * @returns Object created from pairs
 */
export function fromPairs<K extends string | number | symbol, V>(
  pairs: [K, V][]
): Record<K, V> {
  return pairs.reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<K, V>
  );
}

/**
 * Returns the sum of all numbers in an array.
 *
 * @param arr - Array of numbers
 * @returns Sum of all numbers
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * Returns the average of all numbers in an array.
 *
 * @param arr - Array of numbers
 * @returns Average of all numbers, or 0 if array is empty
 */
export function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

/**
 * Returns the minimum value in an array.
 *
 * @param arr - Array of numbers
 * @returns Minimum value or undefined if array is empty
 */
export function min(arr: number[]): number | undefined {
  if (arr.length === 0) return undefined;
  return Math.min(...arr);
}

/**
 * Returns the maximum value in an array.
 *
 * @param arr - Array of numbers
 * @returns Maximum value or undefined if array is empty
 */
export function max(arr: number[]): number | undefined {
  if (arr.length === 0) return undefined;
  return Math.max(...arr);
}

/**
 * Partitions an array into two arrays based on a predicate.
 *
 * @param arr - Array to partition
 * @param predicate - Function that returns true for first partition
 * @returns Tuple of [matching, non-matching] arrays
 */
export function partition<T>(
  arr: T[],
  predicate: (item: T, index: number) => boolean
): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];

  arr.forEach((item, index) => {
    if (predicate(item, index)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  });

  return [truthy, falsy];
}

/**
 * Creates a shallow copy of an array.
 *
 * @param arr - Array to copy
 * @returns Shallow copy of the array
 */
export function clone<T>(arr: T[]): T[] {
  return [...arr];
}

/**
 * Returns a new array with elements sorted by a key or function.
 *
 * @param arr - Array to sort
 * @param keyOrFn - Key name or function to determine sort order
 * @param order - Sort order: 'asc' or 'desc'
 * @returns Sorted array
 */
export function sortBy<T>(
  arr: T[],
  keyOrFn: keyof T | ((item: T) => number | string),
  order: "asc" | "desc" = "asc"
): T[] {
  const result = [...arr];
  const multiplier = order === "asc" ? 1 : -1;

  return result.sort((a, b) => {
    const aVal =
      typeof keyOrFn === "function"
        ? keyOrFn(a)
        : (a[keyOrFn] as number | string);
    const bVal =
      typeof keyOrFn === "function"
        ? keyOrFn(b)
        : (b[keyOrFn] as number | string);

    if (aVal < bVal) return -1 * multiplier;
    if (aVal > bVal) return 1 * multiplier;
    return 0;
  });
}
