describe('User Authentication and Navigation Flow', () => {
  const generateRandomEmail = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    return `test${randomNumber}cypress@gmail.com`;
  };

  const testUser = {
    firstName: 'test',
    lastName: 'cypress',
    email: generateRandomEmail(),
    password: 'JDKjdfhkdf!!23@dhf',
  };

  it('should allow a user to sign up, log in, and view recipe details', () => {
    // Step 1: Visit the "View All Recipes" page
    cy.visit('/');

    // Step 2: Click on a recipe and trigger the login modal
    cy.get('[data-testid="recipe-card"]').eq(1).click(); // Adjust selector
    cy.contains('You need to log in first to view the details of this recipe.');

    // Step 3: Redirect to the login page from the modal
    cy.get('[data-testid="login-redirect"]').eq(1).click(); // Adjust selector
    cy.url().should('include', '/login');

    // Step 4: Navigate to the signup page
    cy.get('[data-testid="signup-link"]').click();
    cy.url().should('include', '/signup');

    // Step 5: Sign up as a new user
    cy.get('input[name=firstname]').type(testUser.firstName);
    cy.get('input[name=lastname]').type(testUser.lastName);
    cy.get('input[name=email]').type(testUser.email);
    cy.get('input[name=password]').type(testUser.password);
    cy.get('button[type=submit]').click();

    // Validate redirection back to the login page
    cy.url().should('include', '/login');
    // cy.contains('Account created successfully').should('be.visible');

    // Step 6: Log in with the newly created account
    cy.get('input[name=username]').type(testUser.email);
    cy.get('input[name=password]').type(testUser.password);
    cy.get('button[type=submit]').click();

    // Validate redirection to "View All Recipes" page
    cy.url().should('include', '/');
    cy.contains('Recipes').should('be.visible');

    // Step 7: Click on a recipe and navigate to the "Detail Recipe" page
    cy.get('[data-testid="recipe-card"]').first().click();
    cy.url().should('include', '/recipe/'); // Assuming the URL contains `/recipe/{id}`
    cy.contains('Preparation Time').should('be.visible');

    // Validate that login modal is no longer displayed
    cy.contains(
      'You need to log in first to view the details of this recipe.',
    ).should('not.exist');
  });
});
