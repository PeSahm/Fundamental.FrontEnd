# Frontend Deployment Guide

Deployment requirements and flow for the Fundamental Frontend (Angular).

## Docker Build

Multi-stage build:

| Stage | Base | Purpose |
|-------|------|---------|
| Build | `node:18-alpine` | `npm ci` + `ng build --configuration production` |
| Runtime | `nginx:1.27-alpine` | Serves static files + API proxy |

**Runtime Details:**
- Non-root user: `appuser` (UID 1000)
- Port: 8080
- Health check: `curl -f http://localhost:8080/health`
- Output directory: `dist/screener`

## Nginx Configuration

### API Proxy
In Kubernetes, the Ingress handles routing `/api` to the backend service. The nginx config includes a fallback proxy for non-Ingress deployments:
- `/api/*` → `http://fundamental-backend:80/api/`
- Rate limiting: 10 req/s, burst 20

### Caching Strategy
- Static assets (js, css, images, fonts): 1-year immutable cache
- `index.html`: no-cache, must-revalidate (forces SPA updates)

### Security Headers
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Environment Configuration

### API URL
| Environment | API Base Path | Source |
|-------------|--------------|--------|
| Development | `https://localhost:5006/` | `environment.ts` |
| Production | `/api/` (relative) | `environment.prod.ts` |

Angular uses file replacements during build to swap environment files. The production build uses relative `/api/` which relies on Kubernetes Ingress to route to the backend.

## Required Secrets

### GitHub Secrets (CI/CD)
| Secret | Purpose |
|--------|---------|
| `REGISTRY_USERNAME` | Container registry auth |
| `REGISTRY_PASSWORD` | Container registry auth |
| `INFRA_REPO_TOKEN` | GitOps repository dispatch |

### Kubernetes Secrets
| Secret Name | Namespace | Purpose |
|-------------|-----------|---------|
| `registry-credentials` | fundamental-dev/prod | Image pull secret |
| `sentry-credentials` | fundamental-dev/prod | `frontend-dsn` key for error tracking |

## CI/CD Flow

```
Push to develop/main
        │
        ▼
Build & Test (ubuntu-latest)
  ├─ npm ci --legacy-peer-deps
  ├─ npm run lint
  ├─ ng build --configuration production
  └─ npm run test (ChromeHeadless)
        │
        ▼
Build Docker Image (self-hosted runner)
  ├─ Docker Buildx with cache
  ├─ Push to registry.academind.ir
  └─ Tag: versioned + environment-latest
        │
        ▼
Trigger GitOps
  └─ repository_dispatch to Fundamental.Infra
        │
        ▼
ArgoCD syncs deployment
```

### Image Tagging
| Branch | Tag Pattern | Latest Tag |
|--------|-------------|------------|
| develop | `dev-YYYYMMDD-SHORT_SHA` | `dev-latest` |
| main | `1.0.0-YYYYMMDD-SHORT_SHA` | `prod-latest` |

## Build Budget
- Initial bundle: max 1.1MB (error), 800KB (warning)
- AOT compilation enabled
- Output hashing enabled
- Vendor chunk excluded in production

## Known Issues

1. **`--legacy-peer-deps`**: Required for `npm ci` due to peer dependency conflicts. Monitor and resolve when updating Angular versions.
2. **Self-hosted runner**: Docker image build step uses `self-hosted, Linux, X64, Iran` labels.
