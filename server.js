// server.js (Render deployment entrypoint)
// Render defaults to 'node server.js' if not specified otherwise.
const { execSync } = require('child_process');

try {
    console.log('Starting API server for Render deployment...');
    // Use npm to safely start the api workspace using the scripts defined in apps/api
    execSync('npm --prefix apps/api run start:prod', { stdio: 'inherit' });
} catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
}
