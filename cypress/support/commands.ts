/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import 'cypress-network-idle';
// export const fn = () => {};

beforeEach(() => {

  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('VITE_API') + '/auth/register',
    alias: 'register',
  });
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: Cypress.env('VITE_API') + '/auth/login',
    alias: 'login',
  });

  
});
declare global {
  namespace Cypress {
    interface Chainable {
      adminLogin(loginInfo: TEST.IRegisterInfo): Chainable<void>;
      login(loginInfo: TEST.IRegisterInfo): Chainable<void>;
      register(registerInfo: TEST.IRegisterInfo): Chainable<void>;
      logout(fullName?: string): Chainable<void>;

      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;

      printLog(msg: any): Chainable<Element>;

      getInputByLabel(label: string): Chainable<JQuery<HTMLInputElement>>;
      getInputByPlaceholder(placeholder: string): Chainable<JQuery<HTMLInputElement | HTMLElement>>;
      getButton(label: string): Chainable<JQuery<HTMLButtonElement>>;

      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

/**
 * Ant Design Form components
 */

Cypress.Commands.add('getInputByLabel', (label: string) => {
  return cy.contains('label', label).parent().parent().find('input, textarea');
});

Cypress.Commands.add('getInputByPlaceholder', (placeholder: string) => {
  return cy.get(`input[placeholder*="${placeholder}"]`);
});
/**
 * Ant Design Button
 */
Cypress.Commands.add('getButton', (text: string) => {
  return cy.get('button:visible').contains(text).filter(':visible');
});

/**
 * SANITIZE DATABASE
 */