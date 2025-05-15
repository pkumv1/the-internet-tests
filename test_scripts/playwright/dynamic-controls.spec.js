const { test, expect } = require('@playwright/test');
const DynamicControlsPage = require('../../page_objects/dynamic-controls-page');

test.describe('Dynamic Controls Tests', () => {
  let dynamicControlsPage;

  test.beforeEach(async ({ page }) => {
    dynamicControlsPage = new DynamicControlsPage(page);
    await dynamicControlsPage.navigate();
  });

  test('TC-013: Enable/Disable Elements', async () => {
    // Verify initial state
    expect(await dynamicControlsPage.checkboxExists()).toBeTruthy();
    expect(await dynamicControlsPage.isInputEnabled()).toBeFalsy();

    // Click Remove button and verify checkbox is removed
    await dynamicControlsPage.clickRemoveButton();
    expect(await dynamicControlsPage.checkboxExists()).toBeFalsy();
    
    // Verify message
    const removeMessage = await dynamicControlsPage.getMessage();
    expect(removeMessage).toContain("It's gone!");

    // Click Add button and verify checkbox is added back
    await dynamicControlsPage.clickAddButton();
    expect(await dynamicControlsPage.checkboxExists()).toBeTruthy();
    
    // Verify message
    const addMessage = await dynamicControlsPage.getMessage();
    expect(addMessage).toContain("It's back!");

    // Click Enable button and verify input is enabled
    await dynamicControlsPage.clickEnableButton();
    expect(await dynamicControlsPage.isInputEnabled()).toBeTruthy();
    
    // Verify message
    const enableMessage = await dynamicControlsPage.getMessage();
    expect(enableMessage).toContain("It's enabled!");

    // Enter text in input field
    const testText = 'Test input text';
    await dynamicControlsPage.enterText(testText);
    expect(await dynamicControlsPage.getInputValue()).toBe(testText);

    // Click Disable button and verify input is disabled
    await dynamicControlsPage.clickDisableButton();
    expect(await dynamicControlsPage.isInputEnabled()).toBeFalsy();
    
    // Verify message
    const disableMessage = await dynamicControlsPage.getMessage();
    expect(disableMessage).toContain("It's disabled!");
  });

  test('TC-014: Race Condition Testing', async ({ page }) => {
    // Set up console error listener
    let consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Click Remove button and immediately click Add button
    await dynamicControlsPage.page.locator('button:has-text("Remove")').click();
    await dynamicControlsPage.page.locator('button:has-text("Add")').click();
    
    // Wait for operations to complete
    await page.waitForSelector('#loading', { state: 'hidden' });
    
    // Verify final state (should be checkbox present if Add was the last operation)
    expect(await dynamicControlsPage.checkboxExists()).toBeTruthy();
    
    // Verify no JavaScript errors occurred
    expect(consoleErrors.length).toBe(0);

    // Click Enable button and immediately click Disable button
    await dynamicControlsPage.page.locator('button:has-text("Enable")').click();
    await dynamicControlsPage.page.locator('button:has-text("Disable")').click();
    
    // Wait for operations to complete
    await page.waitForSelector('#loading', { state: 'hidden' });
    
    // Verify final state (should be disabled if Disable was the last operation)
    expect(await dynamicControlsPage.isInputEnabled()).toBeFalsy();
    
    // Verify no JavaScript errors occurred
    expect(consoleErrors.length).toBe(0);
  });

  test('TC-016: Accessibility During State Changes', async ({ page }) => {
    // This test requires additional accessibility testing tools like axe-core
    // For demonstration purposes, we'll check some basic accessibility attributes
    
    // Check initial loading indicator state (should be hidden)
    expect(await page.locator('#loading').isVisible()).toBeFalsy();
    
    // Click Remove button
    await dynamicControlsPage.clickRemoveButton();
    
    // Verify message has proper accessibility attributes
    expect(await page.locator('#message').getAttribute('role')).toBe('alert');
    
    // Verify enable/disable section has proper labeling
    const inputLabel = await page.locator('form#input-example label');
    expect(await inputLabel.textContent()).toContain('Input Enabled');
    
    // Verify input field has accessibility attributes
    const inputField = await page.locator('#input-example input');
    expect(await inputField.getAttribute('aria-disabled')).toBe('true');
  });
});
