/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular-ivy';
import { environment } from './environments/environment';

import { AppModule } from './app/app.module';

// =============================================================================
// Sentry Initialization - Must be done before Angular bootstraps
// =============================================================================
if (environment.sentry?.dsn) {
  Sentry.init({
    dsn: environment.sentry.dsn,
    environment: environment.production ? 'production' : 'development',
    
    // Performance Monitoring
    integrations: [
      Sentry.browserTracingIntegration(),
      // Session Replay for debugging user sessions
      Sentry.replayIntegration({
        // Capture 10% of all sessions
        sessionSampleRate: environment.production ? 0.1 : 1.0,
        // Capture 100% of sessions with errors
        errorSampleRate: 1.0,
        // Mask all text for privacy
        maskAllText: false,
        // Block all media
        blockAllMedia: false,
      }),
    ],
    
    // Tracing sample rate
    tracesSampleRate: environment.production ? 0.2 : 1.0,
    
    // Replay sample rate
    replaysSessionSampleRate: environment.production ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,
    
    // Release tracking
    release: environment.sentry.release || 'fundamental-frontend@unknown',
    
    // Ignore specific errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      // Random plugins/extensions
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'http://tt.telerik.com/',
      // Network errors
      'Network request failed',
      'Failed to fetch',
      'Load failed',
    ],
    
    // Don't send PII
    sendDefaultPii: false,
    
    // Before sending an event
    beforeSend(event, hint) {
      // Don't send events in development unless explicitly enabled
      if (!environment.production && !environment.sentry?.enableInDev) {
        return null;
      }
      return event;
    },
  });
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
