/// <reference types="cypress" />

import { UNKNOWN_ERROR_OCCURED } from '../../src/constants/errorConstants';

describe('Testing modal', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display error modal with Bad request message as it received from response', () => {
    cy.intercept('GET', 'https://reqres.in/api/products*', {
      statusCode: 400,
      body: { message: 'Bad Request' },
    });
    cy.getByDataCy('modal').should('exist');
    cy.contains('Bad Request');
  });

  it('should display error modal with Internal server error message as it received from response', () => {
    cy.intercept('GET', 'https://reqres.in/api/products*', {
      statusCode: 500,
      body: { message: 'Internal server error' },
    });
    cy.getByDataCy('modal').should('exist');
    cy.contains('Internal server error');
  });

  it('should display error modal with default error message as it received from response when status code was 500', () => {
    cy.intercept('GET', 'https://reqres.in/api/products*', {
      statusCode: 500,
      body: { message: '' },
    });
    cy.getByDataCy('modal').should('exist');
    cy.contains(UNKNOWN_ERROR_OCCURED);
  });

  it('should display error modal with default error message as it received from response when status code was 404', () => {
    cy.intercept('GET', 'https://reqres.in/api/products*', {
      statusCode: 404,
      body: { message: '' },
    });
    cy.getByDataCy('modal').should('exist');
    cy.contains(UNKNOWN_ERROR_OCCURED);
  });

  it('should display error modal with default error message when coudnt fetch product with typed id', () => {
    cy.getByDataCy('global-search').type('122');
    cy.getByDataCy('modal').should('exist');
    cy.contains(UNKNOWN_ERROR_OCCURED);
  });
});
