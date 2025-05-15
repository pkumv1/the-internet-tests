const BasePage = require('./base-page');

/**
 * Page object for the Dynamic Controls page
 */
class DynamicControlsPage extends BasePage {
  constructor(page) {
    super(page);
    this.path = '/dynamic_controls';
    this.checkbox = 'input[type="checkbox"]';
    this.removeButton = 'button:has-text("Remove")';
    this.addButton = 'button:has-text("Add")';
    this.enableButton = 'button:has-text("Enable")';
    this.disableButton = 'button:has-text("Disable")';
    this.inputField = 'input[type="text"]';
    this.loadingIndicator = '#loading';
    this.message = '#message';
  }

  /**
   * Navigate to the dynamic controls page
   */
  async navigate() {
    await super.navigate(this.path);
  }

  /**
   * Check if checkbox exists
   * @returns {Promise<boolean>} - Whether checkbox exists
   */
  async checkboxExists() {
    return await this.elementExists(this.checkbox);
  }

  /**
   * Check if checkbox is checked
   * @returns {Promise<boolean>} - Whether checkbox is checked
   */
  async isCheckboxChecked() {
    return await this.page.locator(this.checkbox).isChecked();
  }

  /**
   * Click checkbox
   */
  async clickCheckbox() {
    await this.page.locator(this.checkbox).click();
  }

  /**
   * Click remove button
   */
  async clickRemoveButton() {
    await this.page.locator(this.removeButton).click();
    await this.waitForLoadingToComplete();
  }

  /**
   * Click add button
   */
  async clickAddButton() {
    await this.page.locator(this.addButton).click();
    await this.waitForLoadingToComplete();
  }

  /**
   * Click enable button
   */
  async clickEnableButton() {
    await this.page.locator(this.enableButton).click();
    await this.waitForLoadingToComplete();
  }

  /**
   * Click disable button
   */
  async clickDisableButton() {
    await this.page.locator(this.disableButton).click();
    await this.waitForLoadingToComplete();
  }

  /**
   * Check if input field is enabled
   * @returns {Promise<boolean>} - Whether input field is enabled
   */
  async isInputEnabled() {
    return await this.page.locator(this.inputField).isEnabled();
  }

  /**
   * Enter text in input field
   * @param {string} text - The text to enter
   */
  async enterText(text) {
    await this.page.locator(this.inputField).fill(text);
  }

  /**
   * Get input field value
   * @returns {Promise<string>} - The input field value
   */
  async getInputValue() {
    return await this.page.locator(this.inputField).inputValue();
  }

  /**
   * Get message text
   * @returns {Promise<string>} - The message text
   */
  async getMessage() {
    await this.waitForElement(this.message);
    return await this.page.locator(this.message).textContent();
  }

  /**
   * Wait for loading indicator to complete
   */
  async waitForLoadingToComplete() {
    await this.waitForElement(this.loadingIndicator);
    await this.page.locator(this.loadingIndicator).waitFor({ state: 'hidden' });
  }
}

module.exports = DynamicControlsPage;