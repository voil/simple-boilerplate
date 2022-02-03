/// <reference types="cypress" />

import { mount } from '@cypress/vue';
import LoginFormOrganism from './index.vue';

const propsData = {
  texts: {
    email: {
      label: 'E-email:*',
      placeholder: 'Enter user e-mail...',
    },
    password: {
      label: 'Password:*',
      placeholder: 'Enter user password...',
    },
    button: 'Login in to platform',
    spinnerMessage: '',
    alerts: {
      success: {
        title: 'Success authentication',
        description: 'Correct login to the platform. There will be a redirection in a moment.',
      },
      error: {
        title: 'Error authentication',
        description: 'Incorrect login to the panel. Incorrect e-mail or password. Please try again in a moment.',
      },
    },
  },
};

describe('LoginFormOrganism.vue', () => {
  beforeEach(() => {
    const name = 'eye-hidden';
    cy.intercept('GET', '/assets/icons/*', { fixture: `../.././public/assets/icons/${name}.svg` });
  });

  it('shoude test red and green path for login form.', () => {
    const config: any = Cypress.config();
    // @ts-ignore
    mount(LoginFormOrganism, { propsData });

    // @ts-ignore
    cy.getElement('emailInput').type('error@app.com')
      .getElement('passwordInput').type('errortesttest1A')
      .getElement('submitButton')
      .click();

    // @ts-ignore
    cy.getElement('alertMessage')
      .should('be.visible');

    // @ts-ignore
    cy.getElement('alertMessage')
      .invoke('attr', 'class')
      .then((className: string) => {
        // @ts-ignore
        expect(className.includes('AlertAtom--error')).equal(true);
      });

    cy.wait(3500);

    // @ts-ignore
    cy.getElement('alertMessage', { timeout: 0 })
      .should('not.exist');

    // @ts-ignore
    cy.getElement('emailInput')
      .find('.InputAtom__input')
      .clear()
      .type(config.mock.user);

    // @ts-ignore
    cy.getElement('passwordInput')
      .find('.PasswordAtom__input')
      .clear()
      .type(config.mock.pass);

    // @ts-ignore
    cy.getElement('submitButton')
      .click();

    // @ts-ignore
    cy.getElement('alertMessage')
      .should('be.visible');

    // @ts-ignore
    cy.getElement('alertMessage')
      .invoke('attr', 'class')
      .then((className: string) => {
        // @ts-ignore
        expect(className.includes('AlertAtom--success')).equal(true);
      });

    // @ts-ignore
    cy.getElement('submitButton', { timeout: 0 })
      .should('not.exist');
  });
});
