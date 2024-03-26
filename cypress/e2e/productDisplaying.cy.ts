/// <reference types="cypress" />

import productResponse from '../fixtures/products-response.json';
import productResponseNoData from '../fixtures/products-response-no-data.json';

function rgbToHex(rgb) {
  const parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  const hex = (x) => ('0' + parseInt(x).toString(16)).slice(-2).toUpperCase();
  return '#' + hex(parts[1]) + hex(parts[2]) + hex(parts[3]);
}

describe('display data', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'https://reqres.in/api/products*', productResponse);
  });

  it('should display no data message', () => {
    cy.intercept(
      'GET',
      'https://reqres.in/api/products*',
      productResponseNoData,
    );
    cy.contains('No Data');
    cy.getByDataCy('table-row').should('not.exist');
  });

  it('should display 5 table rows by default as returned by the api', () => {
    cy.getByDataCy('table-row').should('have.length', 5);
  });

  it('should display only 5 table rows returned by api when rows per page was changed to display 10', () => {
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.get('.MuiSelect-select').click();
    cy.get('[data-value="10"]').click();
    cy.getByDataCy('table-row').should('have.length', 5);
  });

  it('should persist rows per page when reload when select was changed', () => {
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.get('.MuiSelect-select').click();
    cy.get('[data-value="10"]').click();
    cy.getByDataCy('table-row').should('have.length', 5);
    cy.visit('/');
    cy.get('.MuiSelect-select').contains('10');
  });

  it('should color table rows on color as are shown in additional data modal', () => {
    let clickedRowColor;
    cy.getByDataCy('table-row')
      .first()
      .invoke('css', 'background-color')
      .then((color) => {
        clickedRowColor = rgbToHex(color);
      });
    cy.getByDataCy('table-row').first().click();
    cy.getByDataCy('modal').should('be.visible');
    cy.getByDataCy('color-secondary-action')
      .invoke('text')
      .then((modalColor) => {
        expect(modalColor).to.equal(clickedRowColor);
      });
  });
});
