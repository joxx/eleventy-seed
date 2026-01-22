// Utility functions to test imports/exports
export function greet(name: string): string {
    return `Hello, ${name}!`;
}

export function add(a: number, b: number): number {
    return a + b;
}

export const APP_NAME = "11ty Micro";

export default class Logger {
    static log(message: string): void {
        console.log(`[${new Date().toISOString()}] ${message}`);
    }
}
