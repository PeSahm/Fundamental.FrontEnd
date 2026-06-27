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
- **Money/amounts follow Manufacturing (skill `codal-report-page`): a `formatNumber()` component method
  (`toLocaleString('en-US')`, null→'—') wrapped in a `convertToToman()` Toman tooltip
  (`[ngbTooltip]="convertToToman(formatNumber(x))"`, util `src/app/utils/toToman.ts`).** The
  `persianNumber`/`jalali` pipes (`src/app/pipes/`) are for NON-money ordinals/labels/dates only — do NOT
  use `persianNumber` for statement amounts.
- **Item interfaces are INLINE in the `.component.ts`** (NOT in `src/app/models/{sector}/`); each carries
  `rowCode/category/isDataRow/isSummaryRow/rowClass`. **Row classification**: `processData()` sets the row
  flags, `getDataRows()`/`getSummaryRows()` + `getRowClass()`, separate `*ngFor` loops, SCSS row classes.
- Per report type: a List page + a Detail page under `pages/{sector}/{report-type}-list|-detail/`.
  Canonical reference: **`pages/manufacturing/monthly-activity-detail/`** (formatNumber + `[ngbTooltip]` +
  processData + service-spy spec). Detail pages use Pattern B: `service.getById(id)` → `{BaseUrl}/{id}`.
- **List grid symbol filter — send `params.IsinList`, NOT `params.Isin`.** Every non-manufacturing list
  API binds `List<string> IsinList`; a singular `Isin=` does NOT bind to it, so the grid silently
  doesn't filter. Pattern: `if (this.selectedItems.length) { params.IsinList = this.selectedItems[0]?.isin; }`
  (a single value binds to a one-element list). The shared `<app-symbol-search (selectSearchSymbol)>`
  emits `{item}` (non-multi) → `selected()` sets `selectedItems = [e.item]`; the symbol search hits the
  same `SYMBOLS?Filter=` endpoint (now sourced from the RLC backend, returns isin + live price).
- **DIVERGENCE (refactor backlog):** the new ComprehensiveIncome/ChangesInEquity/Portfolio pages do NOT
  follow Manufacturing — F1 use `persianNumber`/`jalali` pipes instead of `formatNumber()`; F2 no Toman
  tooltip; F3 raw million-Rial display; F4 interfaces in `models/` not inline; F5 no row-classification;
  F6 specs use `HttpClientTestingModule`/`NO_ERRORS_SCHEMA`/pipe stubs instead of a service spy. Conform to
  Manufacturing when refactoring each sector.
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

## Build & dev data

- The prod image is built from `Dockerfile.prebuilt` (`FROM registry.academind.ir/library/nginx:…`,
  the in-cluster registry) via the plain daemon `docker build` — so the frontend build needs **none**
  of the backend's Liara `.ir` firewall-mirror gymnastics (that pain is buildkit-on-the-runner only).
- **Dev (`dev.academind.ir`/`api.academind.ir`) now holds a 10-year backfill for ALL sectors**
  (Structural / ServicesIndustry / Agriculture / Investment — done 2026-06-26). Every list + detail
  page has real data to verify against, including the money-display refactor (formatNumber + Toman
  tooltip) and the new ComprehensiveIncome / ChangesInEquity / Portfolio pages.

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
