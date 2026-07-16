import { Page, Locator, expect } from '@playwright/test';

export class SecureAreaPage {
  readonly page: Page;
  readonly successMessage: Locator;
  readonly logoutButton: Locator;
  readonly heading: Locator;

  readonly bodyText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMessage = page.locator('.post-title');
    this.logoutButton = page.getByRole('link', { name: /log out/i });
    this.heading = page.locator('h1, .post-title');
    this.bodyText = page.getByText(/Congratulations|successfully logged in/i);
  }

  async expectSuccessfulLogin() {
    await expect(this.page).toHaveURL(/.*logged-in-successfully.*/);
    await expect(this.heading).toContainText('Logged In Successfully');
  }

  async expectPositiveLogin() {
    await expect(this.page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully\//);
    await expect(this.bodyText).toContainText(/Congratulations|successfully logged in/i);
    await expect(this.logoutButton).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }
}