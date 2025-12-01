type FormDataValue =
  | string
  | number
  | boolean
  | File
  | object
  | null
  | undefined;

interface FormDataOptions {
  skipNull?: boolean;
  skipUndefined?: boolean;
  skipEmptyStrings?: boolean;
}

class FormDataBuilder {
  private formData: FormData;
  private options: FormDataOptions;

  constructor(options?: FormDataOptions) {
    this.formData = new FormData();
    this.options = {
      skipNull: false,
      skipUndefined: true,
      skipEmptyStrings: false,
      ...options,
    };
  }

  /**
   * Add a single field to FormData
   */
  append(key: string, value: FormDataValue): this {
    if (this.shouldSkip(value)) {
      return this;
    }

    if (value instanceof File) {
      this.formData.append(key, value);
    } else if (typeof value === "object" && value !== null) {
      this.formData.append(key, JSON.stringify(value));
    } else if (typeof value === "boolean" || typeof value === "number") {
      this.formData.append(key, value.toString());
    } else if (typeof value === "string") {
      this.formData.append(key, value);
    }

    return this;
  }

  /**
   * Add multiple fields from an object
   */
  appendFields(data: Record<string, FormDataValue>): this {
    Object.entries(data).forEach(([key, value]) => {
      this.append(key, value);
    });

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appendArray(key: string, array: any[] | undefined | null): this {
    if (!array || !Array.isArray(array)) return this;

    array.forEach((item, index) => {
      if (item && typeof item === "object") {
        Object.entries(item).forEach(([nestedKey, value]) => {
          const fullKey = `${key}[${index}].${nestedKey}`;
          this.append(fullKey, value as FormDataValue);
        });
      }
    });

    return this;
  }

  /**
   * Add a file field
   */
  appendFile(key: string, file: File | undefined): this {
    if (file) {
      this.formData.append(key, file);
    }

    return this;
  }

  /**
   * Add an array or object as JSON string
   */
  appendJSON(key: string, value: object | undefined | null): this {
    if (this.shouldSkip(value)) {
      return this;
    }

    if (value && typeof value === "object") {
      this.formData.append(key, JSON.stringify(value));
    }

    return this;
  }

  /**
   * Build and return the FormData instance
   */
  build(): FormData {
    return this.formData;
  }

  /**
   * Check if a value should be skipped based on options
   */
  private shouldSkip(value: FormDataValue): boolean {
    if (value === undefined && this.options.skipUndefined) {
      return true;
    } else if (value === null && this.options.skipNull) {
      return true;
    } else if (value === "" && this.options.skipEmptyStrings) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * Create a new FormData builder instance
 */
export function createFormData(options?: FormDataOptions): FormDataBuilder {
  return new FormDataBuilder(options);
}

export default FormDataBuilder;
