import { test, expect } from '../../src/fixtures';
import { validCredentials, invalidCredentials, errorMessages } from '../../src/data/loginData';

test.describe('Login Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ loginPage, secureAreaPage }) => {
    await loginPage.login(validCredentials.username, validCredentials.password);
    await secureAreaPage.expectSuccessfulLogin();
  });

  test('Positive LogIn test', async ({ loginPage, secureAreaPage }) => {
    await loginPage.login(validCredentials.username, validCredentials.password);
    await secureAreaPage.expectPositiveLogin();
  });

  test('should show error with invalid username', async ({ loginPage }) => {
    await loginPage.login(
      invalidCredentials.wrongUsername.username,
      invalidCredentials.wrongUsername.password
    );
    await loginPage.expectErrorMessage(errorMessages.invalidUsername);
  });

  test('should show error with invalid password', async ({ loginPage }) => {
    await loginPage.login(
      invalidCredentials.wrongPassword.username,
      invalidCredentials.wrongPassword.password
    );
    await loginPage.expectErrorMessage(errorMessages.invalidPassword);
  });

  test('should display login form elements', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });
});