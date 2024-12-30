const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'hfzujw',
  e2e: {
    baseUrl: 'http://localhost:5173', // Replace with your app's URL
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Include TypeScript test files
    supportFile: 'cypress/support/e2e.ts', // Ensure the support file is TypeScript
  },
});
