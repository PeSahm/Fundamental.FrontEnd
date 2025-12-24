export const environment = {
    production: false,
    basePath: 'https://localhost:5006/',
    // Sentry configuration for development
    // Set enableInDev to true to see errors in Sentry while developing
    sentry: {
        dsn: 'https://38844401c136737920b02d7ee173ecbc@sentry.academind.ir/2',
        release: 'fundamental-frontend@dev',
        enableInDev: true, // Enable Sentry in development mode
    }
}