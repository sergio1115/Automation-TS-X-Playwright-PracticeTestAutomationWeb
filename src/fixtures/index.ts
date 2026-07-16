import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SecureAreaPage } from '@pages/SecureAreaPage';
import { ExceptionsPage } from '@pages/ExceptionsPage';
import { TestTablePage } from '@pages/TestTablePage';

type PageFixtures = {
  loginPage: LoginPage;
  secureAreaPage: SecureAreaPage;
  exceptionsPage: ExceptionsPage;
  testTablePage: TestTablePage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  secureAreaPage: async ({ page }, use) => {
    await use(new SecureAreaPage(page));
  },
  exceptionsPage: async ({ page }, use) => {
    await use(new ExceptionsPage(page));
  },
  testTablePage: async ({ page }, use) => {
    await use(new TestTablePage(page));
  },
});

export { expect } from '@playwright/test';