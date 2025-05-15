const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Login Authentication Tests - Selenium', function() {
  this.timeout(30000);
  let driver;
  
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  beforeEach(async function() {
    await driver.get('https://the-internet.herokuapp.com/login');
  });

  it('TC-001: Login with valid credentials', async function() {
    // Enter valid credentials and login
    await driver.findElement(By.id('username')).sendKeys('tomsmith');
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Wait for redirect
    await driver.wait(until.urlContains('/secure'), 5000);
    
    // Verify successful login
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/secure');
    
    // Verify success message
    const flashMessage = await driver.findElement(By.id('flash')).getText();
    expect(flashMessage).to.include('You logged into a secure area!');
  });

  it('TC-002: Login with invalid credentials - wrong username', async function() {
    // Enter invalid username and login
    await driver.findElement(By.id('username')).sendKeys('incorrectuser');
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Verify login failed
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/login');
    
    // Verify error message
    const flashMessage = await driver.findElement(By.id('flash')).getText();
    expect(flashMessage).to.include('Your username is invalid!');
  });

  it('TC-002: Login with invalid credentials - wrong password', async function() {
    // Enter invalid password and login
    await driver.findElement(By.id('username')).sendKeys('tomsmith');
    await driver.findElement(By.id('password')).sendKeys('wrongpassword');
    await driver.findElement(By.css('button[type="submit"]')).click();
    
    // Verify login failed
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include('/login');
    
    // Verify error message
    const flashMessage = await driver.findElement(By.id('flash')).getText();
    expect(flashMessage).to.include('Your password is invalid!');
  });
});
