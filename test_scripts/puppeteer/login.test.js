const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('Login Authentication Tests - Puppeteer', function() {
  this.timeout(30000);
  let browser;
  let page;
  
  before(async function() {
    browser = await puppeteer.launch({ headless: true });
  });

  after(async function() {
    await browser.close();
  });

  beforeEach(async function() {
    page = await browser.newPage();
    await page.goto('https://the-internet.herokuapp.com/login');
  });

  afterEach(async function() {
    await page.close();
  });

  it('TC-001: Login with valid credentials', async function() {
    // Enter valid credentials and login
    await page.type('#username', 'tomsmith');
    await page.type('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    // Wait for redirect
    await page.waitForNavigation();
    
    // Verify successful login
    const currentUrl = page.url();
    expect(currentUrl).to.include('/secure');
    
    // Verify success message
    const flashMessage = await page.$eval('#flash', el => el.textContent);
    expect(flashMessage).to.include('You logged into a secure area!');
  });

  it('TC-002: Login with invalid credentials - wrong username', async function() {
    // Enter invalid username and login
    await page.type('#username', 'incorrectuser');
    await page.type('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    // Wait for flash message
    await page.waitForSelector('#flash');
    
    // Verify login failed
    const currentUrl = page.url();
    expect(currentUrl).to.include('/login');
    
    // Verify error message
    const flashMessage = await page.$eval('#flash', el => el.textContent);
    expect(flashMessage).to.include('Your username is invalid!');
  });

  it('TC-002: Login with invalid credentials - wrong password', async function() {
    // Enter invalid password and login
    await page.type('#username', 'tomsmith');
    await page.type('#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Wait for flash message
    await page.waitForSelector('#flash');
    
    // Verify login failed
    const currentUrl = page.url();
    expect(currentUrl).to.include('/login');
    
    // Verify error message
    const flashMessage = await page.$eval('#flash', el => el.textContent);
    expect(flashMessage).to.include('Your password is invalid!');
  });

  it('TC-005: Session management', async function() {
    // Login with valid credentials
    await page.type('#username', 'tomsmith');
    await page.type('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    // Wait for redirect
    await page.waitForNavigation();
    
    // Verify successful login
    let currentUrl = page.url();
    expect(currentUrl).to.include('/secure');
    
    // Refresh the page
    await page.reload();
    
    // Verify still logged in after refresh
    currentUrl = page.url();
    expect(currentUrl).to.include('/secure');
    
    // Verify logout button is present
    const logoutButton = await page.$('a.button');
    expect(logoutButton).to.not.be.null;
    
    // Click logout
    await page.click('a.button');
    
    // Wait for redirect
    await page.waitForNavigation();
    
    // Verify logged out
    currentUrl = page.url();
    expect(currentUrl).to.include('/login');
    
    // Verify logout message
    const flashMessage = await page.$eval('#flash', el => el.textContent);
    expect(flashMessage).to.include('You logged out of the secure area!');
  });
});
