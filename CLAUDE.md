# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`Fundamental.FrontEnd` is the Angular 16 admin frontend (Persian / RTL) for the CODAL financial-statement
platform. It consumes the `Fundamental.Backend` REST API.

## Commands

```bash
npm install
npm start              # https://localhost:4200 — needs local SSL certs (run install-ca-cert.bat as Admin once; mkcert to regenerate)
npm run start:http     # fallback without SSL
ng build               # prod build → dist/screener/ (budgets: 1.6MB warn / 2MB error initial)
ng test                # Karma + Jasmine
```

## Rules

- Angular 16, routing in `app-routing.module.ts` (NOT standalone routes); all components declared in the
  single `AppModule`.
- **ALL HTTP through `ApiConfigService` (+ `config/api-endpoints.ts`); never hardcode URLs.** Dev base
  `https://localhost:5006/`, prod base relative `/api/` (ingress routes it). Services are thin and
  delegate to the shared `ApiService`.
- RTL layout for all Persian components (`dir="rtl"` on root containers).
- **Persian digits via the `persianNumber` pipe and Jalali dates via the `jalali` pipe**
  (`src/app/pipes/`). Zero-dependency: `persianNumber` = `toLocaleString('fa-IR')` + Latin/Arabic-Indic
  → Persian digit mapping (`pipes/digit-utils.ts`); `jalali` = `Intl.DateTimeFormat('fa-IR-u-ca-persian',
  { timeZone: 'Asia/Tehran' })` and passes already-Jalali strings (`/^1[34]\d{2}[\/-]/`) through
  digit-mapped. Both declared in `AppModule`. (Note: these pipes were referenced by project rules but
  did not exist until 2026-06; do not reintroduce a per-component `formatNumber()`.)
- Per report type: a List page + a Detail page under `pages/{sector}/{report-type}-list|-detail/`.
  Reference: `pages/agriculture/monthly-activity-detail/` (wide RTL items table) and
  `pages/structural/income-statement-detail/` (Detail-rows table).
- Detail pages use Pattern B: `service.getById(id)` → `{BaseUrl}/{id}` (GUID). Owned JSONB collections
  load automatically from the backend.
- Typed models in `src/app/models/{sector}/` — avoid `any`; the model fields must match the backend
  DTO (camelCased). Reuse the `Result<T>` / `DetailResult<T>` envelopes from `models/models.ts`.
- Sentry active (org `fundamental`, project `angular-frontend`).

## Sectors & report kinds (current)

Sectors: manufacturing, agriculture, services-industry, structural, investment. The non-manufacturing
sectors have List + Detail pages for BalanceSheet, IncomeStatement, CashFlow, MonthlyActivity (not
Investment), plus (Structural / ServicesIndustry / Agriculture) **ComprehensiveIncome and
ChangesInEquity** pages, and Investment **PortfolioStatement**.

- **ChangesInEquity detail** renders `items[]` as a wide 12-column RTL matrix (شرح + 11 equity columns:
  capital … total). `rowCode` is a per-row ordinal, NOT a summary flag — don't style by it.
- **ComprehensiveIncome detail** renders `details[]` rows (`row`, `codalRow`, `description`, `value`).
- **Investment portfolio detail** renders 6 typed RTL tables (accepted / not-accepted / buy / sale /
  dividends / industry-groups), each gated by `*ngIf="…?.length"`; profit/loss cells colored by sign.
- Endpoints: `config/api-endpoints.ts` has `COMPREHENSIVE_INCOME` and `CHANGES_IN_EQUITY` per sector
  (`{Area}/comprehensive-income`, `{Area}/changes-in-equity`).

## Known issues

- `ng test` has ~54 pre-existing failing auto-generated scaffold specs (`*DetailComponent`/service specs
  missing `HttpClient`/`ActivatedRoute` providers). The feature's own specs (pipes, the new
  detail components) pass. New component specs should add `HttpClientTestingModule`,
  `RouterTestingModule`, `NO_ERRORS_SCHEMA`, and stub the pipes if the template renders them under
  TestBed.
- Bundle budget was raised to 2MB error / 1.6MB warning (the app already ran near the old 1.5MB limit;
  the new eager pages crossed it). Lazy-loading the sector routes is the proper long-term fix.

## Deferred follow-ups

- Lazy-load the sector routes (bundle size).
- Clean up the ~54 pre-existing scaffold spec failures.
- Investment letter-8 portfolio fields (e.g. `dividendCurrentMonth`) — backend ingestion not yet built,
  so those header scalars stay null for now.
