import { lazy, type ComponentType } from "react";

interface LazyComponentMap {
  // eslint-disable-next-line
  [key: string]: () => Promise<{ default: ComponentType<any> }>;
}

interface LazyComponents {
  // eslint-disable-next-line
  [key: string]: ComponentType<any>;
}

interface LazyLoadOptions {
  retries?: number;
  delayMs?: number;
}

/**
 * Retries a promise-returning function a specified number of times with delay.
 */
function retryImport<T>(
  importFn: () => Promise<T>,
  retries: number,
  delayMs: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    const attempt = (n: number) => {
      importFn()
        .then(resolve)
        .catch((error) => {
          if (n === 0) reject(error);
          else setTimeout(() => attempt(n - 1), delayMs);
        });
    };
    attempt(retries);
  });
}

/**
 * Converts a map of import functions into lazy React components with retry on failure.
 *
 * @param componentMap - Map of component names to dynamic import functions
 * @param options - Optional retry settings (retries, delayMs)
 * @returns Map of component names to lazy React components
 */
const lazyLoad = (
  componentMap: LazyComponentMap,
  options: LazyLoadOptions = {}
): LazyComponents => {
  const { retries = 2, delayMs = 250 } = options;

  const lazyComponents: LazyComponents = {};

  for (const [name, importFn] of Object.entries(componentMap)) {
    lazyComponents[name] = lazy(() => retryImport(importFn, retries, delayMs));
  }

  return lazyComponents;
};

export default lazyLoad;
