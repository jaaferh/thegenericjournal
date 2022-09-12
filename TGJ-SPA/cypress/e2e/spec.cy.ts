describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('Visits the initial project page', () => {
    cy.contains('Authors')
  });

  it('Goes to Authors page when clicking Authors', () => {
    cy.get('li.navitem:nth-child(1) > a:nth-child(1)').click();
    cy.get('h1').should('contain.text', 'Authors')
  });

  it('Logs in to account', () => {
    cy.contains('Login').click()

    cy.url().should('include', '/login')

    cy.get('#email')
      .type('forgot@mypass.com')
      .should('have.value', 'forgot@mypass.com')

    cy.get('#password')
      .type('password')

    cy.contains('Submit').click()

    cy.contains('Forgot MyPass')
    cy.contains('Logout')
  })

  it('Edits profile', () => {
    cy.login('forgot@mypass.com', 'password')
    cy.contains('Forgot MyPass').click()
    cy.contains('Edit').click()

    cy.get('#bio')
      .type('My new Bio')
      .should('have.value', 'My new Bio')

    cy.contains('Submit').click()

    cy.contains('Bio: My new Bio')

  })


});
