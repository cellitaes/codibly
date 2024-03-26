/// <reference types="cypress" />

import productResponseFirstPage from '../fixtures/products-response-first-page.json';
import productResponseSecondPage from '../fixtures/products-response-second-page.json';
import productResponseTenProducts from '../fixtures/products-response-ten-products.json';

describe('Testing modal', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept(
      'GET',
      'https://reqres.in/api/products',
      productResponseFirstPage,
    );
    cy.intercept(
      'GET',
      'https://reqres.in/api/products*page=1*',
      productResponseFirstPage,
    ).as('first-page-request');
    cy.intercept(
      'GET',
      'https://reqres.in/api/products*page=2*',
      productResponseSecondPage,
    ).as('second-page-request');
    cy.intercept(
      'GET',
      'https://reqres.in/api/products*page=1*per_page=10*',
      productResponseTenProducts,
    ).as('ten-products-request');
  });

  it('should fetch products from first and second page when pagination changed', () => {
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.get('.MuiPaginationItem-root').last().click();
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.wait('@second-page-request').should(({ request }) => {
      expect(request.url).to.contain('page=2');
    });
  });

  it('should go to second page then change rows per page to 10 and go on first page again, pagination buttons should be disabled', () => {
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.get('.MuiPaginationItem-root').last().click();
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.get('.MuiSelect-select').click();
    cy.get('[data-value="10"]').click();
    cy.getByDataCy('table-row').should('have.length', 10);
    cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should(
      'have.class',
      'Mui-selected',
    );
    cy.get('.MuiPaginationItem-root').last().should('be.disabled');
    cy.get('.MuiPaginationItem-root').first().should('be.disabled');
  });
});
