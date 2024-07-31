describe('angular-ecommerce-e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display navigation', () => {
    cy.visit('http://localhost:4200');
    cy.contains('span', 'angular-ecommerce');
  });
});
