/** Checks if a phone number already starts with Azerbaijan country code (+994 or 994) */
export const hasAzerbaijanCountryCode = (
  phoneNumber: string | number
): boolean => {
  const phone = String(phoneNumber).trim();
  return /^(\+994|994)(\s|\d|$)/.test(phone);
};

/** Adds Azerbaijan country code (+994) if it's missing */
export const withAzerbaijanCountryCode = (phone: string | number): string => {
  const phoneStr = String(phone).trim().replace(/\s+/g, ""); // remove all spaces

  if (!phoneStr) return "";

  if (hasAzerbaijanCountryCode(phoneStr)) {
    return phoneStr.replace(/^(\+994|994)/, "+994");
  }

  const digitsOnly = phoneStr.replace(/\D+/g, "");
  if (digitsOnly.length >= 9) {
    return `+994${digitsOnly.slice(-9)}`;
  }

  return `+994${digitsOnly}`;
};

export const normalizePhone = (phone: string | number): string =>
  withAzerbaijanCountryCode(phone);
