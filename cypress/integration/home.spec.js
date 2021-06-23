describe('General page overview', () => {
  it('should load the website correctly and fetch New York weather', () => {
    cy.intercept('GET', 'http://ip-api.com/json', {
      city: "New York"
    })

    cy.visit('/');

    cy.contains('New York');
    cy.contains('US');
  })

  it('should load the website correctly and fetch Paris weather', () => {
    cy.intercept('GET', 'http://ip-api.com/json', {
      city: "Paris"
    })

    cy.visit('/');

    cy.contains('Paris');
    cy.contains('FR');
  })

  it('should fetch Toronto weather and make a second request if button refresh was clicked', () => {

    cy.intercept('GET', 'http://ip-api.com/json', {
      city: "Toronto"
    })

    cy.intercept('http://localhost:4000',(req) => {
      req.continue();
    }).as("api");

    cy.visit('/');
    cy.contains('Toronto');
    cy.contains('CA');
    cy.get('button').click();
    cy.wait("@api");

    cy.get('@api.all')
    .should('have.length', 2);
  })

  it('should fetch Sao Paulo weather if user location not found', () => {
    cy.intercept('GET', 'http://ip-api.com/json', { forceNetworkError: true });

    cy.visit('/');
    cy.contains('São Paulo');
    cy.contains('BR');
  })

  it('should fetch Iqaluit weather if user location not found', () => {
    cy.intercept('GET', 'http://ip-api.com/json')

    cy.intercept('http://localhost:4000', { forceNetworkError: true }).as("api");

    cy.visit('/');
    cy.contains('Iqaluit');
    cy.contains('CA');
  })
})