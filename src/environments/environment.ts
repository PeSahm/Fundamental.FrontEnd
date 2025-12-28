export const environment = {
    production: false,
    basePath: 'https://localhost:5006/',
    // Sentry configuration for development
    // Set enableInDev to true to see errors in Sentry while developing
    sentry: {
        dsn: 'https://9e8f20eadb8dd7722fb3c77b707eb60b@sentry.academind.ir/3',
        release: 'fundamental-angular-admin@dev',
        enableInDev: true, // Enable Sentry in development mode
    }
}