/**
 * Base page object with common methods and properties
 */
class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://the-internet.herokuapp.com';
    this.title = '.heading';
  }

  /**
   * Navigate to a specific page path
   * @param {string} path - The page path to navigate to
   */
  async navigate(path) {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  /**
   * Get the page title text
   * @returns {Promise<string>} - The page title text
   */
  async getTitle() {
    return await this.page.locator(this.title).textContent();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot
   * @param {string} name - The screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `./results/screenshots/${name}.png` });
  }

  /**
   * Check if element exists
   * @param {string} selector - The element selector
   * @returns {Promise<boolean>} - Whether the element exists
   */
  async elementExists(selector) {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  /**
   * Get current URL
   * @returns {Promise<string>} - The current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - The element selector
   * @param {Object} options - The wait options
   */
  async waitForElement(selector, options = {}) {
    await this.page.locator(selector).waitFor({ state: 'visible', ...options });
  }
}

module.exports = BasePage;