// Utility functions to test imports/exports

/**
 * Greets a person by name
 * @param {string} name - The name to greet
 * @returns {string} A greeting message
 */
export function greet(name) {
    return `Hello, ${name}!`;
}

/**
 * Adds two numbers together
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 */
export function add(a, b) {
    return a + b;
}

/**
 * @type {string}
 */
export const APP_NAME = "11ty Micro";

/**
 * Logger utility class for timestamped console messages
 */
export default class Logger {
    /**
     * Logs a message with ISO timestamp
     * @param {string} message - The message to log
     * @returns {void}
     */
    static log(message) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    }
}
