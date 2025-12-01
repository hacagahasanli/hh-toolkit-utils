const createStorage = (storage: Storage) => ({
  /** Save any value (auto JSON.stringified) */
  set: <T>(key: string, value: T): void => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`[Storage] Failed to set "${key}":`, err);
    }
  },

  /** Get and parse value, with optional default */
  get: <T>(key: string): T | null => {
    try {
      const item = storage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (err) {
      console.warn(`[Storage] Failed to parse "${key}":`, err);
      return null;
    }
  },

  /** Get with fallback default value */
  getOr: <T>(key: string, defaultValue: T): T => {
    const value = storage.getItem(key);
    if (value === null) return defaultValue;
    try {
      return JSON.parse(value) as T;
    } catch {
      return defaultValue;
    }
  },

  /** Remove a key */
  remove: (key: string): void => {
    storage.removeItem(key);
  },

  /** Check if key exists */
  has: (key: string): boolean => {
    return storage.getItem(key) !== null;
  },

  /** Clear all data in this storage */
  clear: (): void => {
    storage.clear();
  },

  /** Get all keys */
  keys: (): string[] => {
    return Object.keys(storage);
  },
});

export const local = createStorage(localStorage);
export const session = createStorage(sessionStorage);
