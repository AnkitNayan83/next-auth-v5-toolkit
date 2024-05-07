/**
 * An array of routes that are accessible without authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * Routes that are used for api authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default path after loggin in.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
