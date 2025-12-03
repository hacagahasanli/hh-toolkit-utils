import dayjs, { Dayjs } from 'dayjs';

import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { DateFormats } from '../constants/DateFormats';

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export type DateInput = Date | string | number | null | undefined;

/**
 * Converts a Date, string, number, or null into a dayjs object.
 * Returns undefined if input is null, undefined, or invalid.
 *
 * @param date - Date, string, timestamp, or null to convert
 * @returns dayjs object or undefined
 */
export const toDayjs = (date: DateInput): Dayjs | undefined => {
  if (!date) return undefined;
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed : undefined;
};

/**
 * Converts a date to a formatted string using dayjs.
 * Returns undefined if date is null, undefined, or invalid.
 *
 * @param date - Date or string or null/undefined to format
 * @param format - Format string or predefined format (default: DD MMM YYYY)
 * @returns formatted date string or undefined
 */
export const formatDate = (
  date: DateInput,
  format: DateFormats | string = DateFormats.DD_MMM_YYYY_WITH_SPACE,
): string | undefined => {
  const parsed = toDayjs(date);
  return parsed?.format(format);
};

/**
 * Formats a date as a relative time string (e.g., "2 hours ago", "in 3 days").
 *
 * @param date - Date to format
 * @param baseDate - Base date to compare against (default: now)
 * @returns relative time string or undefined
 */
export const formatRelativeTime = (date: DateInput, baseDate?: DateInput): string | undefined => {
  const parsed = toDayjs(date);
  if (!parsed) return undefined;

  const base = baseDate ? toDayjs(baseDate) : dayjs();
  if (!base) return undefined;

  return parsed.from(base);
};

/**
 * Checks if a date is valid.
 *
 * @param date - Date to validate
 * @returns true if valid, false otherwise
 */
export const isValidDate = (date: DateInput): boolean => {
  return toDayjs(date) !== undefined;
};

/**
 * Checks if a date is in the past.
 *
 * @param date - Date to check
 * @returns true if in the past, false otherwise
 */
export const isPast = (date: DateInput): boolean => {
  const parsed = toDayjs(date);
  return parsed ? parsed.isBefore(dayjs()) : false;
};

/**
 * Checks if a date is in the future.
 *
 * @param date - Date to check
 * @returns true if in the future, false otherwise
 */
export const isFuture = (date: DateInput): boolean => {
  const parsed = toDayjs(date);
  return parsed ? parsed.isAfter(dayjs()) : false;
};

/**
 * Checks if a date is today.
 *
 * @param date - Date to check
 * @returns true if today, false otherwise
 */
export const isToday = (date: DateInput): boolean => {
  const parsed = toDayjs(date);
  return parsed ? parsed.isSame(dayjs(), 'day') : false;
};

/**
 * Checks if a date is yesterday.
 *
 * @param date - Date to check
 * @returns true if yesterday, false otherwise
 */
export const isYesterday = (date: DateInput): boolean => {
  const parsed = toDayjs(date);
  return parsed ? parsed.isSame(dayjs().subtract(1, 'day'), 'day') : false;
};

/**
 * Checks if a date is tomorrow.
 *
 * @param date - Date to check
 * @returns true if tomorrow, false otherwise
 */
export const isTomorrow = (date: DateInput): boolean => {
  const parsed = toDayjs(date);
  return parsed ? parsed.isSame(dayjs().add(1, 'day'), 'day') : false;
};

/**
 * Checks if two dates are the same day.
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns true if same day, false otherwise
 */
export const isSameDay = (date1: DateInput, date2: DateInput): boolean => {
  const parsed1 = toDayjs(date1);
  const parsed2 = toDayjs(date2);
  return parsed1 && parsed2 ? parsed1.isSame(parsed2, 'day') : false;
};

/**
 * Checks if a date is between two dates (inclusive).
 *
 * @param date - Date to check
 * @param startDate - Start date
 * @param endDate - End date
 * @returns true if between dates, false otherwise
 */
export const isBetweenDates = (
  date: DateInput,
  startDate: DateInput,
  endDate: DateInput,
): boolean => {
  const parsed = toDayjs(date);
  const start = toDayjs(startDate);
  const end = toDayjs(endDate);

  if (!parsed || !start || !end) return false;

  return parsed.isBetween(start, end, null, '[]');
};

/**
 * Gets the difference between two dates.
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @param unit - Unit of difference (default: days)
 * @returns difference in specified unit or undefined
 */
export const getDateDifference = (
  date1: DateInput,
  date2: DateInput,
  unit: dayjs.UnitType = 'day',
): number | undefined => {
  const parsed1 = toDayjs(date1);
  const parsed2 = toDayjs(date2);

  if (!parsed1 || !parsed2) return undefined;

  return parsed1.diff(parsed2, unit);
};

/**
 * Adds time to a date.
 *
 * @param date - Base date
 * @param amount - Amount to add
 * @param unit - Unit of time (default: days)
 * @returns new date or undefined
 */
export const addToDate = (
  date: DateInput,
  amount: number,
  unit: dayjs.ManipulateType = 'day',
): Dayjs | undefined => {
  const parsed = toDayjs(date);
  return parsed?.add(amount, unit);
};

/**
 * Subtracts time from a date.
 *
 * @param date - Base date
 * @param amount - Amount to subtract
 * @param unit - Unit of time (default: days)
 * @returns new date or undefined
 */
export const subtractFromDate = (
  date: DateInput,
  amount: number,
  unit: dayjs.ManipulateType = 'day',
): Dayjs | undefined => {
  const parsed = toDayjs(date);
  return parsed?.subtract(amount, unit);
};

/**
 * Gets the start of a time unit for a date.
 *
 * @param date - Date to process
 * @param unit - Unit of time (default: day)
 * @returns start of unit or undefined
 */
export const startOf = (date: DateInput, unit: dayjs.OpUnitType = 'day'): Dayjs | undefined => {
  const parsed = toDayjs(date);
  return parsed?.startOf(unit);
};

/**
 * Gets the end of a time unit for a date.
 *
 * @param date - Date to process
 * @param unit - Unit of time (default: day)
 * @returns end of unit or undefined
 */
export const endOf = (date: DateInput, unit: dayjs.OpUnitType = 'day'): Dayjs | undefined => {
  const parsed = toDayjs(date);
  return parsed?.endOf(unit);
};

/**
 * Formats a date range as a string.
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @param format - Format string (default: DD MMM YYYY)
 * @param separator - Separator between dates (default: " - ")
 * @returns formatted date range or undefined
 */
export const formatDateRange = (
  startDate: DateInput,
  endDate: DateInput,
  format: DateFormats | string = DateFormats.DD_MMM_YYYY_WITH_SPACE,
  separator: string = ' - ',
): string | undefined => {
  const start = formatDate(startDate, format);
  const end = formatDate(endDate, format);

  if (!start || !end) return undefined;

  return `${start}${separator}${end}`;
};

/**
 * Gets the age in years from a birthdate.
 *
 * @param birthdate - Date of birth
 * @returns age in years or undefined
 */
export const getAge = (birthdate: DateInput): number | undefined => {
  const parsed = toDayjs(birthdate);
  if (!parsed) return undefined;

  return dayjs().diff(parsed, 'year');
};

/**
 * Parses a date string with a specific format.
 *
 * @param dateString - Date string to parse
 * @param format - Expected format
 * @returns dayjs object or undefined
 */
export const parseDate = (dateString: string, format: string): Dayjs | undefined => {
  const parsed = dayjs(dateString, format);
  return parsed.isValid() ? parsed : undefined;
};

/**
 * Converts a date to ISO string format.
 *
 * @param date - Date to convert
 * @returns ISO string or undefined
 */
export const toISOString = (date: DateInput): string | undefined => {
  const parsed = toDayjs(date);
  return parsed?.toISOString();
};

/**
 * Converts a date to Unix timestamp (seconds).
 *
 * @param date - Date to convert
 * @returns Unix timestamp or undefined
 */
export const toUnixTimestamp = (date: DateInput): number | undefined => {
  const parsed = toDayjs(date);
  return parsed?.unix();
};

/**
 * Gets the current date and time as a dayjs object.
 *
 * @returns current dayjs object
 */
export const now = (): Dayjs => dayjs();

/**
 * Compares two dates.
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns -1 if date1 < date2, 0 if equal, 1 if date1 > date2, undefined if invalid
 */
export const compareDates = (date1: DateInput, date2: DateInput): -1 | 0 | 1 | undefined => {
  const parsed1 = toDayjs(date1);
  const parsed2 = toDayjs(date2);

  if (!parsed1 || !parsed2) return undefined;

  if (parsed1.isBefore(parsed2)) return -1;
  if (parsed1.isAfter(parsed2)) return 1;
  return 0;
};
