export const environment = {
    production: false,
    basePath: 'https://localhost:5006/',
    // Sentry configuration for development
    sentry: {
        dsn: '', // Set via environment variable or leave empty to disable
        release: 'fundamental-frontend@dev',
        enableInDev: false, // Set to true to test Sentry in development
    }
}