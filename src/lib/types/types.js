// @ts-check

/**
 * @typedef {Object} User
 * @property {string} apodo
 * @property {string} [nombre]
 * @property {string} [correo]
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user
 * @property {boolean} isAuthenticated
 * @property {string|null} token
 */

/**
 * @typedef {Object} Credentials
 * @property {string} correo
 * @property {string} contrasenna
 */

/**
 * @typedef {Object} LoginResponse
 * @property {string} token
 * @property {User} user
 */

/**
 * @typedef {Object} DecodedToken
 * @property {string} userApodo
 * @property {number} exp
 */

/**
 * @typedef {Object} ProfileData
 * @property {string} apodo
 * @property {string} [nombre]
 * @property {string} [correo]
 */

export {};