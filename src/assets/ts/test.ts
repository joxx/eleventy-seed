// Test esbuild bundling with imports/exports
import Logger, { greet, add, APP_NAME } from './utils';

// Test named imports
console.log(greet('World'));
console.log(`2 + 3 = ${add(2, 3)}`);
console.log(`App: ${APP_NAME}`);

// Test default import
Logger.log('esbuild is working correctly!');
Logger.log('TypeScript modules are being bundled');

// DOM interaction test
document.addEventListener('DOMContentLoaded', () => {
    Logger.log('DOM loaded');
    document.body.style.backgroundColor = '#f0f0f0';
});