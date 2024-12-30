describe('Recipe Details Interaction', () => {
  const testUser = {
    email: 'test1cypress@gmil.com',
    password: '123456',
  };

  const testRecipe = {
    id: '676abd847af454fd92cafcf9', // Replace with a valid recipe ID for testing
    title: 'Sample Recipe',
  };

  const initialComment = 'This is a test comment.';
  const updatedComment = 'This is an updated test comment.';

  beforeEach(() => {
    // Log in as the test user
    cy.visit('/login');
    cy.get('input[name=email]').type(testUser.email);
    cy.get('input[name=password]').type(testUser.password);
    cy.get('button[type=submit]').click();

    // Wait for redirection after login
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should allow rating and commenting functionality on a recipe', () => {
    // Step 1: Navigate to the Detail Recipe page
    cy.get(`[data-testid="recipe-card"][data-id="${testRecipe.id}"]`).click();
    cy.url().should('include', `/recipe/${testRecipe.id}`);
    cy.contains(testRecipe.title).should('be.visible');

    // Step 2: Rate the recipe
    cy.get('.rating-stars') // Adjust selector based on your star rating component
      .find('[data-testid="star"]')
      .eq(4) // Assuming 5-star rating, 0-based index
      .click();

    // Step 3: Validate that the rating is stored
    cy.get('.rating-stars')
      .find('[data-testid="star"]')
      .eq(4)
      .should('have.class', 'selected'); // Adjust the class used for selected stars

    // Step 4: Ensure the rating cannot be changed
    cy.get('.rating-stars').find('[data-testid="star"]').eq(2).click();
    cy.get('.rating-stars')
      .find('[data-testid="star"]')
      .eq(4)
      .should('have.class', 'selected');

    // Step 5: Add a comment
    cy.get('textarea[name=comment]').type(initialComment);
    cy.get('button[data-testid="add-comment"]').click();

    // Step 6: Validate the comment is displayed
    cy.get('.comments-list').contains(initialComment).should('be.visible');

    // Step 7: Edit the comment
    cy.get('.comments-list')
      .contains(initialComment)
      .closest('.comment-item')
      .find('button[data-testid="edit-comment"]')
      .click();
    cy.get('textarea[name=comment]').clear().type(updatedComment);
    cy.get('button[data-testid="update-comment"]').click();

    // Step 8: Validate the updated comment is displayed
    cy.get('.comments-list').contains(updatedComment).should('be.visible');
  });
});
