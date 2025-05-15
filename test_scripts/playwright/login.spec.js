const { test, expect } = require('@playwright/test');
const LoginPage = require('../../page_objects/login-page');

test.describe('Login Authentication Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC-001: Login with valid credentials', async () => {
    // Perform login with valid credentials
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    
    // Verify successful login
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeTruthy();
    
    // Verify success message
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('You logged into a secure area!');
  });

  test('TC-002: Login with invalid credentials - wrong username', async () => {
    // Perform login with invalid username
    await loginPage.login('incorrectuser', 'SuperSecretPassword!');
    
    // Verify login failed
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeFalsy();
    
    // Verify error message
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('Your username is invalid!');
  });

  test('TC-002: Login with invalid credentials - wrong password', async () => {
    // Perform login with invalid password
    await loginPage.login('tomsmith', 'wrongpassword');
    
    // Verify login failed
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeFalsy();
    
    // Verify error message
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('Your password is invalid!');
  });

  test('TC-003: SQL Injection attempt', async () => {
    // Attempt SQL injection
    await loginPage.login("' OR '1'='1", "' OR '1'='1");
    
    // Verify login failed
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeFalsy();
    
    // Verify error message
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('Your username is invalid!');
  });

  test('TC-004: XSS attempt', async () => {
    // Attempt XSS injection
    await loginPage.login("<script>alert('XSS')</script>", "anypassword");
    
    // Verify login failed
    const isSuccess = await loginPage.isLoginSuccessful();
    expect(isSuccess).toBeFalsy();
    
    // Verify error message
    const message = await loginPage.getFlashMessage();
    expect(message).toContain('Your username is invalid!');
    
    // Verify no alert was triggered (would be caught by Playwright's internal handling)
  });
});
