describe('Recipe Details Interaction', () => {
  const testUser = {
    email: 'test12cypress@gmil.com',
    password: '123456',
  };

  const testRecipe = {
    id: '676393951a3be1f32a1ddc6b', // Replace with a valid recipe ID for testing
    title: 'Vegetable Stir-Fry',
  };

  const initialComment = 'This is a test comment.';
  const updatedComment = 'This is an updated test comment.';

  beforeEach(() => {
    // Log in as the test user
    cy.visit('/login');
    cy.get('input[name=username]').type(testUser.email);
    cy.get('input[name=password]').type(testUser.password);
    cy.get('button[type=submit]').click();
  });

  it('should allow rating and commenting functionality on a recipe', () => {
    // Step 1: Navigate to the Detail Recipe page
    cy.get(`[data-testid="recipe-card"][data-id="${testRecipe.id}"]`).click();
    cy.url().should('include', `/recipe/${testRecipe.id}`);
    cy.contains(testRecipe.title).should('be.visible');

    // Step 2: Rate the recipe
    cy.get('.rating-stars')
      // Adjust selector based on your star rating component
      .find('[data-testid="star"]')
      .then((ele) => {
        console.log(ele, 1);
      })
      .eq(1)
      // Assuming 5-star rating, 0-based index
      .click();

    // Step 3: Validate that the rating is stored
    cy.get('.rating-stars')
      .find('[data-testid="star"]')
      .eq(1)
      .should('have.class', 'active'); // Adjust the class used for selected stars

    // // Step 4: Ensure the rating cannot be changed
    cy.get('.rating-stars').find('[data-testid="star"]').eq(3).click();
    cy.get('.rating-stars')
      .find('[data-testid="star"]')
      .eq(3)
      .then((star) => {
        console.log(star, 2);
      })
      .should('not.have.class', 'active');

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
    cy.get('button[data-testid="add-comment"]').click();

    // Step 8: Validate the updated comment is displayed
    cy.get('.comments-list').contains(updatedComment).should('be.visible');
  });
});
