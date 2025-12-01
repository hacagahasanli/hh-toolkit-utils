/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a new object by selecting only specified keys from the input object.
 * @param obj - Source object
 * @param keys - Array of keys to pick
 * @returns New object with picked keys
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Creates a new object by removing specified keys from the input object.
 * @param obj - Source object
 * @param keys - Array of keys to omit
 * @returns New object without omitted keys
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (let i = 0; i < keys.length; i++) {
    delete result[keys[i]];
  }
  return result;
}

/**
 * Merges two objects into a new object.
 * Properties from the source override those in the target.
 * @param target - Target object
 * @param source - Source object
 * @returns Merged object
 */
export function merge<T extends object, U extends object>(
  target: T,
  source: U
): T & U {
  return { ...target, ...source };
}

/**
 * Removes keys from the object that have undefined, null,
 * empty string, or empty array values.
 * @param obj - Input object
 * @returns Partial object without empty values
 */
export function cleanObject<T extends object>(obj: T): Partial<T> {
  const result = {} as Partial<T>;
  for (const key in obj) {
    const value = obj[key];
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Checks if all values in an object are "complete",
 * meaning not undefined, null, empty string, or empty array.
 * @param obj - Input object
 * @returns True if all values are complete, otherwise false
 */
export function areAllValuesComplete<T extends object>(obj: T): boolean {
  return Object.values(obj).every(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
  );
}

/**
 * Checks if a value is an object (not null or array).
 *
 * @param o - Value to check
 * @returns True if value is an object, false otherwise
 */
export function isObject(o: unknown): boolean {
  return typeof o === "object" && o !== null && !Array.isArray(o);
}

/**
 * Returns an array of the object's own property names.
 *
 * @param o - Object to get keys from
 * @returns Array of property names
 */
export function keys<T extends object>(o: T): (keyof T)[] {
  return Object.keys(o) as (keyof T)[];
}

/**
 * Returns an array of the object's own property values.
 *
 * @param o - Object to get values from
 * @returns Array of property values
 */
export function values<T extends object>(o: T): T[keyof T][] {
  return Object.values(o);
}

/**
 * Returns an array of key-value pairs for the object's own properties.
 *
 * @param o - Object to get entries from
 * @returns Array of [key, value] pairs
 */
export function entries<T extends object>(o: T): [keyof T, T[keyof T]][] {
  return Object.entries(o) as [keyof T, T[keyof T]][];
}

/**
 * Deep clones an object using JSON serialization.
 * Note: This method doesn't preserve functions, undefined values, or circular references.
 *
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Deep merges two objects recursively.
 * Properties from source override those in target.
 *
 * @param target - Target object
 * @param source - Source object
 * @returns Deep merged object
 */
export function deepMerge<T extends object, U extends object>(
  target: T,
  source: U
): T & U {
  const result = { ...target } as T & U;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = (target as any)[key];
      const sourceValue = source[key];

      if (isObject(targetValue) && isObject(sourceValue)) {
        (result as any)[key] = deepMerge(
          targetValue as object,
          sourceValue as object
        );
      } else {
        (result as any)[key] = sourceValue;
      }
    }
  }

  return result;
}

/**
 * Checks if two objects are equal by deep comparison.
 *
 * @param obj1 - First object
 * @param obj2 - Second object
 * @returns True if objects are equal, false otherwise
 */
export function isEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!isEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

/**
 * Gets a value from an object using a dot-notation path.
 *
 * @param obj - Source object
 * @param path - Dot-notation path (e.g., "user.address.city")
 * @param defaultValue - Default value if path doesn't exist
 * @returns Value at path or default value
 */
export function get<T = any>(
  obj: any,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result?.[key] === undefined) {
      return defaultValue;
    }
    result = result[key];
  }

  return result;
}

/**
 * Sets a value in an object using a dot-notation path.
 * Creates nested objects as needed.
 *
 * @param obj - Target object
 * @param path - Dot-notation path (e.g., "user.address.city")
 * @param value - Value to set
 * @returns Modified object
 */
export function set<T extends object>(obj: T, path: string, value: any): T {
  const keys = path.split(".");
  const lastKey = keys.pop()!;

  let current: any = obj;

  for (const key of keys) {
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
  return obj;
}

/**
 * Checks if an object has a property at the specified path.
 *
 * @param obj - Source object
 * @param path - Dot-notation path (e.g., "user.address.city")
 * @returns True if property exists, false otherwise
 */
export function has(obj: any, path: string): boolean {
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (
      current === null ||
      current === undefined ||
      !Object.prototype.hasOwnProperty.call(current, key)
    ) {
      return false;
    }
    current = current[key];
  }

  return true;
}

/**
 * Inverts an object's keys and values.
 *
 * @param obj - Object to invert
 * @returns New object with keys and values swapped
 */
export function invert<K extends string | number, V extends string | number>(
  obj: Record<K, V>
): Record<V, K> {
  const result = {} as Record<V, K>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[obj[key]] = key;
    }
  }
  return result;
}

/**
 * Maps over object values, transforming them with a function.
 *
 * @param obj - Source object
 * @param fn - Function to transform each value
 * @returns New object with transformed values
 */
export function mapValues<T extends object, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => U
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key as keyof T] = fn(obj[key], key as keyof T);
    }
  }
  return result;
}

/**
 * Maps over object keys, transforming them with a function.
 *
 * @param obj - Source object
 * @param fn - Function to transform each key
 * @returns New object with transformed keys
 */
export function mapKeys<T extends object>(
  obj: T,
  fn: (key: keyof T, value: T[keyof T]) => string
): Record<string, T[keyof T]> {
  const result = {} as Record<string, T[keyof T]>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = fn(key as keyof T, obj[key]);
      result[newKey] = obj[key];
    }
  }
  return result;
}

/**
 * Freezes an object deeply (recursive).
 *
 * @param obj - Object to freeze
 * @returns Deeply frozen object
 */
export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = (obj as any)[prop];
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });

  return obj;
}

/**
 * Filters an object's properties based on a predicate function.
 *
 * @param obj - Source object
 * @param predicate - Function that returns true for properties to keep
 * @returns New object with filtered properties
 */
export function filterObject<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result = {} as Partial<T>;
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      predicate(obj[key], key as keyof T)
    ) {
      result[key as keyof T] = obj[key];
    }
  }
  return result;
}

/**
 * Unflattens a dot-notation object into a nested object.
 *
 * @param obj - Flattened object with dot-notation keys
 * @returns Nested object
 */
export function unflatten(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      set(result, key, obj[key]);
    }
  }

  return result;
}
