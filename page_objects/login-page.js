const BasePage = require('./base-page');

/**
 * Page object for the Login page
 */
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.path = '/login';
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = 'button[type="submit"]';
    this.flashMessage = '#flash';
  }

  /**
   * Navigate to the login page
   */
  async navigate() {
    await super.navigate(this.path);
  }

  /**
   * Enter username
   * @param {string} username - The username to enter
   */
  async enterUsername(username) {
    await this.page.locator(this.usernameInput).fill(username);
  }

  /**
   * Enter password
   * @param {string} password - The password to enter
   */
  async enterPassword(password) {
    await this.page.locator(this.passwordInput).fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.page.locator(this.loginButton).click();
  }

  /**
   * Login with credentials
   * @param {string} username - The username
   * @param {string} password - The password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
    await this.waitForNavigation();
  }

  /**
   * Get flash message text
   * @returns {Promise<string>} - The flash message text
   */
  async getFlashMessage() {
    await this.waitForElement(this.flashMessage);
    return await this.page.locator(this.flashMessage).textContent();
  }

  /**
   * Check if login was successful
   * @returns {Promise<boolean>} - Whether login was successful
   */
  async isLoginSuccessful() {
    const url = await this.getCurrentUrl();
    return url.includes('/secure');
  }
}

module.exports = LoginPage;