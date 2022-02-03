/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getElement('greeting')
     */
     getElement(name: string, options: any): any;
  }
}