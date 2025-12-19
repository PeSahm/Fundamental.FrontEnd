export const environment = {
    production: true,
    // Uses relative path - nginx ingress routes /api/* to backend
    basePath: '/api/',
    // Sentry configuration for production
    // DSN will be injected at build time via environment variable
    sentry: {
        dsn: '${SENTRY_DSN}', // Replaced at build time
        release: '${SENTRY_RELEASE}', // Replaced at build time
        enableInDev: false,
    }
}