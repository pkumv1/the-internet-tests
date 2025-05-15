/**
 * Script to run tests and generate combined reports
 */
const { execSync } = require('child_process');
const { generateCombinedReport } = require('./utils/report-generator');
const path = require('path');
const fs = require('fs');

// Create results directory if it doesn't exist
const resultsDir = path.join(__dirname, 'results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(resultsDir, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

try {
  console.log('Running Playwright tests...');
  execSync('npx playwright test', { stdio: 'inherit' });
} catch (error) {
  console.error('Playwright tests completed with failures');
}

try {
  console.log('Running Selenium tests...');
  execSync('npx mocha test_scripts/selenium/**/*.js --reporter json --reporter-options output=./results/selenium-results.json', { stdio: 'inherit' });
} catch (error) {
  console.error('Selenium tests completed with failures');
}

try {
  console.log('Running Puppeteer tests...');
  execSync('npx mocha test_scripts/puppeteer/**/*.js --reporter json --reporter-options output=./results/puppeteer-results.json', { stdio: 'inherit' });
} catch (error) {
  console.error('Puppeteer tests completed with failures');
}

console.log('Generating combined report...');
try {
  generateCombinedReport({
    playwrightResults: './results/playwright-results.json',
    seleniumResults: './results/selenium-results.json',
    puppeteerResults: './results/puppeteer-results.json',
    outputPath: './results/combined-report.html'
  });
  console.log('Combined report generated successfully!');
} catch (error) {
  console.error('Failed to generate combined report:', error);
}

console.log('All tests completed. See results in the ./results directory.');
