# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Playwright + TypeScript end-to-end test automation framework targeting [practicetestautomation.com](https://practicetestautomation.com). All tests run against `baseURL: https://practicetestautomation.com` (configured in `playwright.config.ts`).

## Commands

```bash
npm test                  # run all tests headless
npm run test:headed       # run with browser visible
npm run test:ui           # open Playwright UI mode
npm run test:debug        # run with Playwright inspector
npm run test:report       # open last HTML report
npm run test:login        # run only tests/login/
```

Run a single test file:
```bash
npx playwright test tests/login/login.spec.ts
```

Run a single test by title:
```bash
npx playwright test -g "should login successfully"
```

## Architecture

Page Object Model with custom Playwright fixtures.

**`src/pages/`** — Page Object classes. Each class receives a `Page` and exposes locators + action/assertion methods. Navigation (`goto`) lives in the page object, not in tests.

**`src/fixtures/index.ts`** — Extends Playwright's `test` base to inject page objects as typed fixture arguments (`loginPage`, `secureAreaPage`). Tests import `{ test, expect }` from here, not from `@playwright/test` directly.

**`src/data/`** — Static test data (credentials, expected strings). Keep all test data here, not inline in spec files.

**`src/utils/`** — Shared helpers (e.g., `waitForNavigation`, `generateRandomString`).

**`tests/`** — Spec files grouped by feature (e.g., `tests/login/`). Each spec imports `test` and `expect` from `../../src/fixtures`.

## Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:
- `@pages/*` → `src/pages/*`
- `@fixtures/*` → `src/fixtures/*`
- `@data/*` → `src/data/*`
- `@utils/*` → `src/utils/*`

Use these aliases in imports instead of relative paths.

## Adding New Tests

1. Create a page object in `src/pages/` if the page isn't covered yet.
2. Add the fixture to `src/fixtures/index.ts` so tests can receive it as an argument.
3. Add any test data to `src/data/`.
4. Create the spec file under `tests/<feature>/`.
