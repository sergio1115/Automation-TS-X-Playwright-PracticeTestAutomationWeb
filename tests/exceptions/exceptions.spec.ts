import { test, expect } from '../../src/fixtures';

test.describe('Exceptions Page', () => {
  test.beforeEach(async ({ exceptionsPage }) => {
    await exceptionsPage.navigate();
  });

  test('Test case 1: NoSuchElementException - row 2 is displayed after clicking Add', async ({ exceptionsPage }) => {
    await exceptionsPage.clickAdd();
    await exceptionsPage.expectRow2Visible();
  });

  test('Test case 2: ElementNotInteractableException - type and save in row 2', async ({ exceptionsPage }) => {
    await exceptionsPage.clickAdd();
    await exceptionsPage.expectRow2Visible();
    await exceptionsPage.typeInRow2('Sushi');
    await exceptionsPage.row2SaveButton.click();
    await exceptionsPage.expectRow2InputValue('Sushi');
  });

  test('Test case 3: InvalidElementStateException - enable row 1 input and change its value', async ({ exceptionsPage }) => {
    await exceptionsPage.clickEdit();
    await exceptionsPage.expectRow1InputEnabled();
    await exceptionsPage.row1Input.clear();
    await exceptionsPage.typeInRow1('Pizza');
    await exceptionsPage.clickSave();
    await exceptionsPage.expectRow1InputValue('Pizza');
  });

  test('Test case 4: StaleElementReferenceException - instructions hidden after adding row 2', async ({ exceptionsPage }) => {
    await exceptionsPage.expectInstructionsVisible();
    await exceptionsPage.clickAdd();
    await exceptionsPage.expectInstructionsHidden();
  });

  test('Test case 5: TimeoutException - row 2 is not displayed within 3 seconds', async ({ exceptionsPage }) => {
    await exceptionsPage.clickAdd();
    // Row 2 takes ~5 seconds to load; asserting it is not visible within 3 seconds
    await expect(exceptionsPage.row2).not.toBeVisible({ timeout: 3000 });
  });
});
