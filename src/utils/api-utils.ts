import CookieManager from "../lib/cookie";

import { isNulOrUndefined } from "./common-utils";

/**
 * Configuration for a shared feature endpoint.
 * Can be a string URL or an object mapping roles to URLs.
 */
interface SharedFeatureConfig {
  endpoint: string | Record<string, string | null>;
}

/**
 * Collection of shared features keyed by feature name.
 */
type SharedFeatures = Record<string, SharedFeatureConfig>;

/**
 * Returns the API endpoint URL for a given role and feature.
 * If the endpoint is an object, it looks up the URL for the role.
 * Returns null if the feature or role URL is not found.
 *
 * @param role - User role (e.g., 'admin', 'user')
 * @param feature - Feature key to look up
 * @param sharedFeatures - Object containing all shared features config
 */
export function getEndpoint(
  role: string,
  feature: keyof SharedFeatures,
  sharedFeatures: SharedFeatures
): string | null {
  const featureConfig = sharedFeatures?.[feature];

  if (!featureConfig) return null;

  if (typeof featureConfig.endpoint === "object") {
    return featureConfig.endpoint?.[role] || null;
  }

  return featureConfig.endpoint;
}

/**
 * Converts an object to a URL query string, excluding
 * keys with undefined, null, or empty string values.
 * Supports array values by adding multiple entries.
 *
 * @param query - Object representing query parameters
 * @returns URL-encoded query string
 */
// eslint-disable-next-line
export const generateQuery = (query: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  if (isNulOrUndefined(query)) {
    return "";
  }

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null && v !== "") {
          searchParams.append(key, String(v));
        }
      });
    } else if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};

/**
 * Checks if the user is logged in by verifying
 * the presence of an access token cookie.
 */
export const isLoggedIn = (name: string) => {
  return !!CookieManager.get(name);
};
