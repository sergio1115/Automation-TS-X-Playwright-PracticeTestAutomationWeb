import { Page, Locator, expect } from '@playwright/test';

export class ExceptionsPage {
  readonly page: Page;
  readonly instructions: Locator;
  readonly row1: Locator;
  readonly row1Input: Locator;
  readonly editButton: Locator;
  readonly saveButton: Locator;
  readonly addButton: Locator;
  readonly row2: Locator;
  readonly row2Input: Locator;
  readonly row2SaveButton: Locator;
  readonly loadingIndicator: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.instructions = page.locator('#instructions');
    this.row1 = page.locator('#row1');
    this.row1Input = page.locator('#row1 .input-field');
    this.editButton = page.locator('#edit_btn');
    this.saveButton = page.locator('#save_btn');
    this.addButton = page.locator('#add_btn');
    this.row2 = page.locator('#row2');
    this.row2Input = page.locator('#row2 .input-field');
    this.row2SaveButton = page.locator('#row2 button[name="Save"]');
    this.loadingIndicator = page.locator('#loading');
    this.confirmationMessage = page.locator('#confirmation');
  }

  async navigate() {
    await this.page.goto('/practice-test-exceptions/');
  }

  async clickEdit() {
    await this.editButton.click();
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async typeInRow1(text: string) {
    await this.row1Input.fill(text);
  }

  async typeInRow2(text: string) {
    await this.row2Input.fill(text);
  }

  async expectRow1InputEnabled() {
    await expect(this.row1Input).toBeEnabled();
  }

  async expectRow1InputDisabled() {
    await expect(this.row1Input).toBeDisabled();
  }

  async expectRow2Visible() {
    await expect(this.row2).toBeVisible({ timeout: 10000 });
  }

  async expectLoadingVisible() {
    await expect(this.loadingIndicator).toBeVisible();
  }

  async expectConfirmationMessage(text: string) {
    await expect(this.confirmationMessage).toContainText(text);
  }

  async expectRow1InputValue(value: string) {
    await expect(this.row1Input).toHaveValue(value);
  }

  async expectRow2InputValue(value: string) {
    await expect(this.row2Input).toHaveValue(value);
  }

  async expectInstructionsVisible() {
    await expect(this.instructions).toBeVisible();
  }

  async expectInstructionsHidden() {
    await expect(this.instructions).not.toBeVisible();
  }
}
