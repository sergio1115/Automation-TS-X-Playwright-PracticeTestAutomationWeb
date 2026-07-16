import { Page, Locator, expect } from '@playwright/test';

type Language = 'Any' | 'Java' | 'Python';
type Level = 'Beginner' | 'Intermediate' | 'Advanced';
type EnrollmentMin = 'any' | '5000' | '10000' | '50000';
type SortColumn = 'col_id' | 'col_course' | 'col_lang' | 'col_level' | 'col_enroll';

export class TestTablePage {
  readonly page: Page;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly resetButton: Locator;
  readonly noDataMessage: Locator;
  readonly sortBySelect: Locator;
  readonly enrollDropdown: Locator;
  readonly langAnyRadio: Locator;
  readonly langJavaRadio: Locator;
  readonly langPythonRadio: Locator;
  readonly levelBeginnerCheckbox: Locator;
  readonly levelIntermediateCheckbox: Locator;
  readonly levelAdvancedCheckbox: Locator;
  readonly colId: Locator;
  readonly colCourse: Locator;
  readonly colLang: Locator;
  readonly colLevel: Locator;
  readonly colEnroll: Locator;
  readonly colLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('#courses_table');
    this.tableRows = page.locator('#courses_table tbody tr');
    this.resetButton = page.locator('#resetFilters');
    this.noDataMessage = page.locator('#noData');
    this.sortBySelect = page.locator('#sortBy');
    this.enrollDropdown = page.locator('#enrollDropdown');
    this.langAnyRadio = page.locator('input[name="lang"][value="Any"]');
    this.langJavaRadio = page.locator('input[name="lang"][value="Java"]');
    this.langPythonRadio = page.locator('input[name="lang"][value="Python"]');
    this.levelBeginnerCheckbox = page.locator('input[name="level"][value="Beginner"]');
    this.levelIntermediateCheckbox = page.locator('input[name="level"][value="Intermediate"]');
    this.levelAdvancedCheckbox = page.locator('input[name="level"][value="Advanced"]');
    this.colId = page.locator('#col_id');
    this.colCourse = page.locator('#col_course');
    this.colLang = page.locator('#col_lang');
    this.colLevel = page.locator('#col_level');
    this.colEnroll = page.locator('#col_enroll');
    this.colLink = page.locator('#col_link');
  }

  async navigate() {
    await this.page.goto('/practice-test-table/');
  }

  async filterByLanguage(lang: Language) {
    await this.page.locator(`input[name="lang"][value="${lang}"]`).check();
  }

  async filterByLevel(level: Level) {
    await this.page.locator(`input[name="level"][value="${level}"]`).check();
  }

  async filterByEnrollment(value: EnrollmentMin) {
    await this.enrollDropdown.click();
    await this.page.locator(`#enrollDropdown [data-value="${value}"]`).click();
  }

  async sortBy(column: SortColumn) {
    await this.sortBySelect.selectOption(column);
  }

  async resetFilters() {
    await this.resetButton.click();
  }

  async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  async getCellText(rowIndex: number, colIndex: number): Promise<string> {
    return (await this.tableRows.nth(rowIndex).locator('td').nth(colIndex).textContent())?.trim() ?? '';
  }

  async getRowByCourseName(name: string): Promise<Locator> {
    return this.tableRows.filter({ hasText: name });
  }

  async expectRowCount(count: number) {
    await expect(this.tableRows).toHaveCount(count);
  }

  async expectNoDataVisible() {
    await expect(this.noDataMessage).toBeVisible();
  }

  async expectTableVisible() {
    await expect(this.table).toBeVisible();
  }

  async expectRowContains(rowIndex: number, text: string) {
    await expect(this.tableRows.nth(rowIndex)).toContainText(text);
  }
}
