/// <reference types="cypress" />

describe('Search testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open modal after row click and close it after confirmation btn click', () => {
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.increaseSearchByN(1);
    cy.getByDataCy('table-row').should('have.length', 1);
    cy.location('search').should('contain', 'id=1');
    cy.get('button[aria-label="Clear search"]').click();
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.location('search').should('not.contain', 'id');
  });

  it('should use global search, change page, clear search and stay at third page displaying 2 elements when default rows per page was not changed', () => {
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.increaseSearchByN(1);
    cy.getByDataCy('table-row').should('have.length', 1);
    cy.location('search').should('contain', 'id=1');
    cy.increaseSearchByN(1);
    cy.getByDataCy('table-row').should('have.length', 1);
    cy.location('search').should('contain', 'id=2');
    cy.get(':nth-child(5) > .MuiButtonBase-root').click();
    cy.location('search').should('contain', 'id=2');
    cy.location('search').should('contain', 'page=3');
    cy.get('button[aria-label="Clear search"]').click();
    cy.getByDataCy('table-row').should('have.length', 2);
    cy.location('search').should('not.contain', 'id');
    cy.location('search').should('contain', 'page=3');
  });

  it('should change rows per page to more elements than data count and find for 10th element in global filter and then decrease by 10 again and see if query string was not containg id=', () => {
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.get('.MuiSelect-select').click();
    cy.get('[data-value="15"]').click();
    cy.getByDataCy('table-row').should('have.length', 12);
    cy.increaseSearchByN(10);
    cy.getByDataCy('table-row').should('have.length', 1);
    cy.get('[aria-label="10"]').should('contain', 10);
    cy.decreaseSearchByN(10);
    cy.getByDataCy('table-row').should('have.length', 12);
    cy.location('search').should('not.contain', 'id');
  });

  it('should access page with id param provided and fill search by that value and display one concreate product', () => {
    cy.visit('http://localhost?id=10');
    cy.getByDataCy('table-row').should('have.length', 1);
    cy.getByDataCy('global-search').then(($input) => {
      expect($input.val()).to.be.eq('10');
    });
    cy.location('search').should('contain', 'id');
  });

  it('should access page with id and page param provided and fill search by that value and display one concreate product with second page on pagination selected', () => {
    cy.visit('http://localhost?id=10&page=2');
    cy.getByDataCy('table-row').should('have.length', 1);
    cy.getByDataCy('global-search').then(($input) => {
      expect($input.val()).to.be.eq('10');
    });
    cy.get(':nth-child(4) > .MuiButtonBase-root').should(
      'have.class',
      'Mui-selected',
    );
    cy.location('search').should('contain', 'id=');
    cy.location('search').should('contain', 'page=');
  });

  it('should not accept any other signs than numbers', () => {
    cy.getByDataCy('global-search').type('d');
    cy.getByDataCy('global-search').type('-');
    cy.getByDataCy('global-search').type('e');
    cy.getByDataCy('global-search').type('!');
    cy.getByDataCy('global-search').type('+');
    cy.getByDataCy('global-search').then(($input) => {
      expect($input.val()).to.eq('');
    });
  });

  it('should accept when user types numbers', () => {
    cy.getByDataCy('global-search').type('11');
    cy.getByDataCy('global-search').then(($input) => {
      expect($input.val()).to.eq('11');
    });
    cy.get('[aria-label="11"]').should('contain', '11');
  });
});
