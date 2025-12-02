/** Defines the allowed types for class names input */
export type ClassValue =
  | string
  | undefined
  | null
  | boolean
  | {
      /** Object with keys as class names and values indicating inclusion */
      [key: string]: boolean | string | number;
    };

/**
 * Utility function to conditionally combine class names into a single string.
 *
 * Accepts any number of arguments of various types:
 * - Strings: added directly
 * - Arrays: recursively flattened and processed
 * - Objects: keys included if their value is truthy
 * - Falsy values (undefined, null, false): ignored
 *
 * @param {...ClassValue[]} args - List of class names or structures
 * @returns {string} Combined class names separated by spaces
 *
 * Example:
 * classnames('btn', { active: isActive, disabled: isDisabled }, ['extra', ['nested']])
 *    returns 'btn active extra nested' if isActive is true and isDisabled is false
 */
export function cn(...args: ClassValue[]): string {
  return (
    args
      .flatMap((arg) => {
        /** Ignore falsy values (false, null, undefined, '') */
        if (!arg) return [];

        /** Return string as a one-element array */
        if (typeof arg === "string") return [arg];

        /** Recursively handle nested arrays */
        if (Array.isArray(arg)) return cn(...arg);

        if (typeof arg === "object") {
          /** Include keys where the corresponding value is truthy (non-zero, non-empty string, true)s */
          return Object.keys(arg).filter((key) => Boolean(arg[key]));
        }

        /** Fallback: ignore any other types */
        return [];
      })
      /** Join all collected class names with spaces */
      .join(" ")
  );
}
