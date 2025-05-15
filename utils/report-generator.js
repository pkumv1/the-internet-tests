/**
 * Utility for generating test reports
 */
const fs = require('fs');
const path = require('path');

/**
 * Generate HTML report from test results
 * @param {Object} results - Test results object
 * @param {string} outputPath - Path to save the report
 */
function generateHtmlReport(results, outputPath) {
  const reportTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Results Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { margin-bottom: 20px; }
        .test-results { border-collapse: collapse; width: 100%; }
        .test-results th, .test-results td { border: 1px solid #ddd; padding: 8px; }
        .test-results tr:nth-child(even) { background-color: #f2f2f2; }
        .test-results th { padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #4CAF50; color: white; }
        .pass { color: green; }
        .fail { color: red; }
        .skip { color: orange; }
        .metrics { margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1>Test Results Report</h1>
      <div class="summary">
        <h2>Summary</h2>
        <p>Total Tests: ${results.stats.tests}</p>
        <p>Passed: <span class="pass">${results.stats.passes}</span></p>
        <p>Failed: <span class="fail">${results.stats.failures}</span></p>
        <p>Skipped: <span class="skip">${results.stats.skipped || 0}</span></p>
        <p>Duration: ${results.stats.duration / 1000}s</p>
      </div>
      
      <h2>Test Results</h2>
      <table class="test-results">
        <tr>
          <th>Test</th>
          <th>Status</th>
          <th>Duration</th>
        </tr>
        ${results.tests.map(test => `
          <tr>
            <td>${test.fullTitle}</td>
            <td class="${test.pass ? 'pass' : 'fail'}">${test.pass ? 'PASS' : 'FAIL'}</td>
            <td>${test.duration / 1000}s</td>
          </tr>
        `).join('')}
      </table>
      
      <div class="metrics">
        <h2>Test Metrics</h2>
        <p>Test Coverage: ${results.coverage ? results.coverage.percentage + '%' : 'N/A'}</p>
        <p>Test Execution Time: ${results.stats.duration / 1000}s</p>
        <p>Test Success Rate: ${(results.stats.passes / results.stats.tests * 100).toFixed(2)}%</p>
      </div>
    </body>
    </html>
  `;
  
  fs.writeFileSync(outputPath, reportTemplate);
  console.log(`Report generated at: ${outputPath}`);
}

/**
 * Process and combine results from multiple test runners
 * @param {Object} config - Configuration object
 */
function generateCombinedReport(config) {
  const { playwrightResults, seleniumResults, puppeteerResults, outputPath } = config;
  
  // Read results from different test runners
  const pwResults = JSON.parse(fs.readFileSync(playwrightResults, 'utf8'));
  const seleniumRes = JSON.parse(fs.readFileSync(seleniumResults, 'utf8'));
  const puppeteerRes = JSON.parse(fs.readFileSync(puppeteerResults, 'utf8'));
  
  // Combine stats
  const combinedStats = {
    tests: pwResults.stats.tests + seleniumRes.stats.tests + puppeteerRes.stats.tests,
    passes: pwResults.stats.passes + seleniumRes.stats.passes + puppeteerRes.stats.passes,
    failures: pwResults.stats.failures + seleniumRes.stats.failures + puppeteerRes.stats.failures,
    skipped: (pwResults.stats.skipped || 0) + (seleniumRes.stats.skipped || 0) + (puppeteerRes.stats.skipped || 0),
    duration: pwResults.stats.duration + seleniumRes.stats.duration + puppeteerRes.stats.duration
  };
  
  // Combine test results
  const combinedTests = [
    ...pwResults.tests.map(test => ({ ...test, runner: 'Playwright' })),
    ...seleniumRes.tests.map(test => ({ ...test, runner: 'Selenium' })),
    ...puppeteerRes.tests.map(test => ({ ...test, runner: 'Puppeteer' }))
  ];
  
  // Generate combined report
  const combinedResults = {
    stats: combinedStats,
    tests: combinedTests
  };
  
  generateHtmlReport(combinedResults, outputPath);
}

module.exports = {
  generateHtmlReport,
  generateCombinedReport
};
