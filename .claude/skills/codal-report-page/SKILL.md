---
name: codal-report-page
description: Use when building, modifying, or reviewing an Angular CODAL report page (list or detail) for ANY sector (manufacturing, structural, services-industry, investment, agriculture). Enforces the Manufacturing UI pattern — inline interfaces, formatNumber() + convertToToman() Toman tooltip on money, rowCode-based row classification, and service-spy specs. Invoke BEFORE creating a report page and when auditing existing non-manufacturing pages against Manufacturing.
---

# CODAL report page — the Manufacturing canonical Angular pattern

**Manufacturing detail/list pages are the reference. All sectors must match them.** Reference set:
`src/app/pages/manufacturing/monthly-activity-detail/` (and its `-list`).

## Money & numbers — the #1 rule
CODAL amounts arrive in **million Rial**. Manufacturing renders every numeric cell with a component method
`formatNumber()` (Latin grouped digits), and wraps **money** cells in a `convertToToman()` Toman tooltip:

```ts
import convertToToman from 'src/app/utils/toToman';
// in component:
convertToToman = convertToToman;
formatNumber(value: number | undefined | null): string {
  return value == null ? '—' : value.toLocaleString('en-US');
}
```
```html
<!-- non-money quantity -->
<td class="text-end">{{ formatNumber(item.quantity) }}</td>
<!-- money: formatNumber + Toman tooltip on hover -->
<td class="text-end">
  <span [ngbTooltip]="convertToToman(formatNumber(item.amount))" tooltipClass="tooltip-class">
    {{ formatNumber(item.amount) }}
  </span>
</td>
```

**Do NOT use the `persianNumber` pipe for money/amounts.** `persianNumber`/`jalali` are only for non-money
ordinals, labels, fiscal year, and dates where Persian digits are explicitly wanted — not the standard for
statement values. (The backend exposes these as the `SignedCodalMoney` value object → million-Rial decimals.)

## Component structure (`.component.ts`)
- **Interfaces are INLINE** in the component file (NOT in `src/app/models/…`). Each item interface carries
  `rowCode: number; category?: number; isDataRow?: boolean; isSummaryRow?: boolean; rowClass?: string;`.
- `isLoading`, `reportData`/`activityData` (typed, never `any`), `error`.
- `ngOnInit` reads `id` from `route.snapshot.paramMap`, calls `loadDetail(id)`; `loadDetail` →
  `service.getById(id)` piped through `finalize(() => this.isLoading = false)`, `subscribe({next,error})`.
- `processData(data)` enriches rows: `isDataRow = rowCode === -1`, `isSummaryRow = rowCode !== -1`,
  `rowClass = getRowClass(item)`.
- Helpers: `getDataRows()`, `getSummaryRows()` (one set per item collection), `getRowClass()`, `goBack()`.

## Template (`.component.html`)
- Root `<div class="container-fluid" dir="rtl">`; loading + error blocks; content gated `*ngIf="reportData && !isLoading"`.
- Header card: نماد/ISIN, عنوان شرکت, traceNo via `formatNumber`, link to CODAL (`reportData.uri`).
- Native `<table class="table table-striped table-hover">` (NOT `app-table`); `text-end` for numerics.
- **Separate loops**: `*ngFor="let item of getDataRows()"` (`<tr class="data-row">`) and
  `*ngFor="let item of getSummaryRows()"` (`<tr [ngClass]="item.rowClass">`).

## SCSS (`.component.scss`)
Row classes with colored `border-left`: `.total-sum-row`/`.internal-sum-row`/`.export-sum-row`/`.summary-row`/
`.data-row:hover`; compact table fonts; `.text-end { text-align: left; }` (RTL); print media hides buttons.
Keep ≤ ~2KB (component-style budget 2.5KB warn / 4KB error).

## Spec (`.component.spec.ts`)
Service `jasmine.createSpyObj`, mocked `ActivatedRoute.snapshot.paramMap.get`, `RouterTestingModule`. Tests:
create, loads-on-init, error path, `formatNumber` (null→'—'), row classification, `getRowClass`.
**NO `HttpClientTestingModule`, NO `NO_ERRORS_SCHEMA`, NO pipe stubs** (formatNumber is a method).

## Wiring & services
- Service is thin, delegates to `ApiService` (never raw `HttpClient`), endpoint from `config/api-endpoints.ts`
  (Pattern B `getById(id)` → `{endpoint}/{id}`). Routes in `app-routing.module.ts` (Persian titles); declare
  components in `AppModule`; add a sidebar entry per sector card.
- **List page symbol filter — send `params.IsinList`, NOT `params.Isin`.** The non-mfg list APIs bind
  `List<string> IsinList`; a singular `Isin=` doesn't bind, so the grid silently won't filter (was a live
  bug). Use `if (this.selectedItems.length) { params.IsinList = this.selectedItems[0]?.isin; }`. The
  shared `<app-symbol-search (selectSearchSymbol)="selected($event)">` emits `{item}` → `selected()` sets
  `selectedItems = [e.item]`; search the (RLC-backed) `SYMBOLS?Filter=` endpoint returns isin + price.

## Known divergences to FIX (current non-manufacturing pages — refactor backlog)
The new ComprehensiveIncome/ChangesInEquity/Portfolio pages diverge:
- **F1** Use `persianNumber`/`jalali` pipes instead of `formatNumber()`. → Replace with `formatNumber()`.
- **F2** No `convertToToman` Toman tooltip on money cells. → Add `[ngbTooltip]="convertToToman(formatNumber(x))"`.
- **F3** Million-Rial values shown raw with no value-object-aware/Toman treatment. → Apply F2.
- **F4** Interfaces in separate `src/app/models/{sector}/…` files instead of inline. → Inline them.
- **F5** No `processData`/`getDataRows`/`getSummaryRows`/`rowClass` classification. → Add it.
- **F6** Specs use `HttpClientTestingModule` + `NO_ERRORS_SCHEMA` + stub pipes instead of a service spy. → Use the Manufacturing spec shape.

When CREATING a page, follow the checklist (no divergences). When auditing/refactoring (e.g. the خدماتی/
Services pages), fix F1–F6 to match Manufacturing. **Dev (`dev.academind.ir`) has a 10-year backfill for
all sectors (done 2026-06-26)** — verify rendering and the money-display fix against real data, not just
unit specs.

## Reference files (read these)
`src/app/pages/manufacturing/monthly-activity-detail/*` (formatNumber + `[ngbTooltip]` + processData),
`src/app/utils/toToman.ts`; the diverged `src/app/pages/structural/changes-in-equity-detail/*`.
