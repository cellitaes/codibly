/// <reference types="cypress" />

import productResponse from '../fixtures/products-response.json';

describe('Testing modal', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'https://reqres.in/api/products*', productResponse);
    cy.getByDataCy('table-row').first().click();
    cy.getByDataCy('modal').should('exist');
  });

  it('should open modal after row click and close it after confirmation btn click', () => {
    cy.getByDataCy('confirm-modal-btn').click();
    cy.getByDataCy('modal').should('not.exist');
  });

  it('should open modal after row click and close it after close icon click', () => {
    cy.getByDataCy('close-modal-icon').click();
    cy.getByDataCy('modal').should('not.exist');
  });

  it('should open modal after row click and close it after backdrop click', () => {
    cy.getByDataCy('modal-backdrop').click({ force: true });
    cy.getByDataCy('modal').should('not.exist');
  });
});
