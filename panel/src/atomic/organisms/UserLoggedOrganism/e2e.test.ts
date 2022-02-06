/// <reference types="cypress" />

import { mount } from '@cypress/vue';
import { wait } from '@testing-library/vue';
import UserLoggedOrganism from './index.vue';

const propsData = {
  menuOptions: {
    profile: {
      icon: 'edit',
      label: 'Profile user',
    },
    logout: {
      label: 'Logout',
      icon: 'lock',
    },
  },
};

describe('UserLoggedOrganism.vue', () => {
  it('should show logout popover and logout user.', () => {
    const config: any = Cypress.config();
    // @ts-ignore
    mount(UserLoggedOrganism, { propsData });

    // @ts-ignore
    cy.getElement('dropdownAtomInstance')
      .click();
    
    // @ts-ignore
    cy.getElement('dropdownOverlayerInstance')
      .should('exist');

    // @ts-ignore
    cy.getElement('logoutMenuElement')
      .click({ force: true });

    // @ts-ignore
    cy.getElement('dropdownOverlayerInstance')
      .should('not.exist');

    // @ts-ignore
    cy.getElement('popoverConfirmInstance')
      .should('exist');

    // @ts-ignore
    cy.getElement('buttonElementCancelInstance')
      .click();

    // @ts-ignore
    cy.getElement('popoverConfirmInstance', { timeout: 0 })
      .should('not.exist');

    // @ts-ignore
    cy.getElement('dropdownAtomInstance')
      .click();

    // @ts-ignore
    cy.getElement('dropdownOverlayerInstance')
      .should('exist');

    // @ts-ignore
    cy.getElement('logoutMenuElement')
      .click({ force: true });

    // @ts-ignore
    cy.getElement('dropdownOverlayerInstance')
      .should('not.exist');

    // @ts-ignore
    cy.getElement('buttonElementSubmitInstance')
      .click();

    cy.url().should('include', '/authorization/login')
  });
});
