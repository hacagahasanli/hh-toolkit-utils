/**
 * No operation function - does nothing.
 */
export const noop = () => {};

/**
 * Composes multiple functions into a single function,
 * where the output of each function is input to the previous.
 * The functions are applied right-to-left.
 *
 * @param fn1 - Last function to call
 * @param fns - Other functions to compose
 * @returns Composed function
 */
export function compose<R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) {
  return fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);
}

/**
 * Creates a debounced version of a function that delays
 * invoking the function until after wait milliseconds have
 * elapsed since the last time it was invoked.
 *
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function with cancel method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

/**
 * Creates a throttled version of a function that only invokes
 * the function at most once per every wait milliseconds.
 *
 * @param func - Function to throttle
 * @param wait - Delay in milliseconds
 * @returns Throttled function with cancel method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastRan: number | null = null;

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();

    if (lastRan === null || now - lastRan >= wait) {
      func(...args);
      lastRan = now;
    } else if (timeout === null) {
      timeout = setTimeout(() => {
        func(...args);
        lastRan = Date.now();
        timeout = null;
      }, wait - (now - lastRan));
    }
  };

  throttled.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastRan = null;
  };

  return throttled;
};

/**
 * Creates a memoized version of a function that caches the result
 * based on the arguments provided.
 *
 * @param func - Function to memoize
 * @param resolver - Optional function to generate cache key
 * @returns Memoized function with cache access
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const memoize = <T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => string
): T & { cache: Map<string, ReturnType<T>> } => {
  const cache = new Map<string, ReturnType<T>>();

  const memoized = (...args: Parameters<T>): ReturnType<T> => {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };

  memoized.cache = cache;

  return memoized as T & { cache: Map<string, ReturnType<T>> };
};

/**
 * Creates a function that is restricted to invoking func once.
 * Repeat calls return the value from the first call.
 *
 * @param func - Function to restrict
 * @returns Function that can only be called once
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const once = <T extends (...args: any[]) => any>(func: T): T => {
  let called = false;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true;
      result = func(...args);
    }
    return result;
  }) as T;
};

/**
 * Delays the execution of a function by the specified number of milliseconds.
 *
 * @param func - Function to delay
 * @param wait - Delay in milliseconds
 * @param args - Arguments to pass to the function
 * @returns Timeout ID that can be used to cancel the delay
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const delay = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  ...args: Parameters<T>
): ReturnType<typeof setTimeout> => {
  return setTimeout(() => func(...args), wait);
};

/**
 * Retries a function a specified number of times with a delay between attempts.
 *
 * @param func - Async function to retry
 * @param retries - Number of retry attempts (default: 3)
 * @param delayMs - Delay between retries in milliseconds (default: 1000)
 * @returns Promise that resolves with the function result or rejects after all retries
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const retry = async <T extends (...args: any[]) => Promise<any>>(
  func: T,
  retries: number = 3,
  delayMs: number = 1000
): Promise<Awaited<ReturnType<T>>> => {
  let lastError: Error;

  for (let i = 0; i <= retries; i++) {
    try {
      return await func();
    } catch (error) {
      lastError = error as Error;
      if (i < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError!;
};

/**
 * Creates a curried version of a function.
 *
 * @param func - Function to curry
 * @returns Curried function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const curry = <T extends (...args: any[]) => any>(
  func: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function curried(...args: any[]): any {
    if (args.length >= func.length) {
      return func(...args);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...nextArgs: any[]) => curried(...args, ...nextArgs);
  };
};

/**
 * Creates a function that accepts arguments and invokes func with them,
 * but with the arguments reversed.
 *
 * @param func - Function to flip arguments
 * @returns Function with flipped arguments
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flip = <T extends (...args: any[]) => any>(
  func: T
): ((...args: [...Parameters<T>]) => ReturnType<T>) => {
  return (...args: Parameters<T>) => func(...args.reverse());
};

/**
 * Creates a function that invokes func with partials prepended to the arguments.
 *
 * @param func - Function to partially apply
 * @param partials - Arguments to prepend
 * @returns Partially applied function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const partial = <T extends (...args: any[]) => any>(
  func: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...partials: any[]
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
((...args: any[]) => ReturnType<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => func(...partials, ...args);
};

/**
 * Creates a function that negates the result of the predicate func.
 *
 * @param predicate - Predicate function to negate
 * @returns Negated predicate function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const negate = <T extends (...args: any[]) => boolean>(
  predicate: T
): ((...args: Parameters<T>) => boolean) => {
  return (...args: Parameters<T>) => !predicate(...args);
};

/**
 * Safely calls a function if it exists, otherwise does nothing.
 *
 * @param func - Function to call (may be undefined or null)
 * @param args - Arguments to pass to the function
 * @returns Result of the function or undefined
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const safeCall = <T extends (...args: any[]) => any>(
  func: T | undefined | null,
  ...args: Parameters<T>
): ReturnType<T> | undefined => {
  return func ? func(...args) : undefined;
};

/**
 * Wraps a function with try-catch and returns [error, result] tuple.
 * Useful for Go-style error handling in JavaScript/TypeScript.
 *
 * @param func - Function to wrap
 * @returns Function that returns [error, result] tuple
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tryCatch = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => [Error | null, ReturnType<T> | null]) => {
  return (...args: Parameters<T>) => {
    try {
      const result = func(...args);
      return [null, result];
    } catch (error) {
      return [error as Error, null];
    }
  };
};

/**
 * Wraps an async function with try-catch and returns [error, result] tuple.
 * Useful for Go-style error handling with async operations.
 *
 * @param func - Async function to wrap
 * @returns Function that returns Promise of [error, result] tuple
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tryCatchAsync = <T extends (...args: any[]) => Promise<any>>(
  func: T
): ((
  ...args: Parameters<T>
) => Promise<[Error | null, Awaited<ReturnType<T>> | null]>) => {
  return async (...args: Parameters<T>) => {
    try {
      const result = await func(...args);
      return [null, result];
    } catch (error) {
      return [error as Error, null];
    }
  };
};

/**
 * Creates a function that limits the rate at which func can fire.
 * Calls are queued and executed one at a time with a minimum delay between them.
 *
 * @param func - Function to rate limit
 * @param minDelay - Minimum delay in milliseconds between calls
 * @returns Rate limited function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rateLimit = <T extends (...args: any[]) => any>(
  func: T,
  minDelay: number
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  const queue: Array<{
    args: Parameters<T>;
    resolve: (value: ReturnType<T>) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reject: (error: any) => void;
  }> = [];
  let processing = false;

  const processQueue = async () => {
    if (processing || queue.length === 0) return;

    processing = true;
    const { args, resolve, reject } = queue.shift()!;

    try {
      const result = await func(...args);
      resolve(result);
    } catch (error) {
      reject(error);
    }

    await new Promise((r) => setTimeout(r, minDelay));
    processing = false;
    processQueue();
  };

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve, reject) => {
      queue.push({ args, resolve, reject });
      processQueue();
    });
  };
};

/**
 * Identity function - returns the argument unchanged.
 *
 * @param value - Value to return
 * @returns The same value
 */
export const identity = <T>(value: T): T => value;

/**
 * Creates a function that always returns the same value.
 *
 * @param value - Value to return
 * @returns Function that returns the value
 */
export const constant =
  <T>(value: T): (() => T) =>
  () =>
    value;

/**
 * Returns the first n elements of an array.
 * If n is 0 or undefined, returns array with first element.
 *
 * @param array - Array to get elements from
 * @param n - Number of elements to get from the beginning
 * @returns Array of first n elements or null if array is null/undefined
 */
export function firstSeveral<T>(array: Array<T>, n?: number): T[] | null {
  if (!array) return null;
  if (n === 0 || n === undefined) return [array[0]];

  const part: T[] = [];
  const limit = Math.min(n, array.length);
  for (let i = 0; i < limit; i += 1) {
    part.push(array[i]);
  }
  return part;
}

/**
 * Returns the last n elements of an array.
 * If n is 0 or undefined, returns array with last element.
 *
 * @param array - Array to get elements from
 * @param n - Number of elements to get from the end
 * @returns Array of last n elements or null if array is null/undefined
 */
export function lastSeveral<T>(array: Array<T>, n?: number): T[] | null {
  if (!array) return null;
  if (n === 0 || n === undefined) return [array[array.length - 1]];

  const res: T[] = [];
  const start = Math.max(0, array.length - n);
  for (let i = array.length - 1; i >= start; i -= 1) {
    res.unshift(array[i]);
  }
  return res;
}
