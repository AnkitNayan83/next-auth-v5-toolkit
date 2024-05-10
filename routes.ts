/**
 * An array of routes that are accessible without authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = ["/", "/auth/verify"];

/**
 * An array of routes that are used for authentication.
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * Routes that are used for api authentication.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * Default path after loggin in.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
