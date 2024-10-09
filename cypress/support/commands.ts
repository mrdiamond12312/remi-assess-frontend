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

import "cypress-network-idle";
// export const fn = () => {};

beforeEach(() => {
  cy.waitForNetworkIdlePrepare({
    method: "POST",
    pattern: Cypress.env("VITE_API") + "/auth/register",
    alias: "register",
  });
  cy.waitForNetworkIdlePrepare({
    method: "POST",
    pattern: Cypress.env("VITE_API") + "/auth/login",
    alias: "login",
  });
  cy.waitForNetworkIdlePrepare({
    method: "POST",
    pattern: Cypress.env("VITE_API") + "/video/share",
    alias: "shareVideo",
  });
  cy.waitForNetworkIdlePrepare({
    method: "GET",
    pattern: Cypress.env("VITE_API") + "/video",
    alias: "getVideos",
  });
});

before(() => {
  cy.waitForNetworkIdlePrepare({
    method: "POST",
    pattern: Cypress.env("VITE_API") + "/auth/register",
    alias: "register",
  });
  cy.waitForNetworkIdlePrepare({
    method: "POST",
    pattern: Cypress.env("VITE_API") + "/auth/login",
    alias: "login",
  });
});
declare global {
  namespace Cypress {
    interface Chainable {
      // Reusable Actions
      // # Authentication
      login(loginInfo: TEST.IRegisterInfo): Chainable<void>;
      register(registerInfo: TEST.IRegisterInfo): Chainable<void>;
      logout(fullName?: string): Chainable<void>;

      // # Video Page
      shareVideo(
        videoInfo: TEST.IVideoInfo,
        userInfo: TEST.IRegisterInfo
      ): Chainable<void>;

      // Common Components Actions
      getInputByLabel(label: string): Chainable<JQuery<HTMLInputElement>>;
      getInputByPlaceholder(
        placeholder: string
      ): Chainable<JQuery<HTMLInputElement | HTMLElement>>;
      getButton(label: string): Chainable<JQuery<HTMLButtonElement>>;

      // Database Manipulation (only use on dev-server for CI or local)
      sanitizeDatabase(payload: TEST.IDBSanitize): Chainable<void>;

      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;

      // printLog(msg: any): Chainable<Element>;
    }
  }
}

/**
 * Ant Design Form components
 */

Cypress.Commands.add("getInputByLabel", (label: string) => {
  return cy.contains("label", label).parent().parent().find("input, textarea");
});

Cypress.Commands.add("getInputByPlaceholder", (placeholder: string) => {
  return cy.get(`input[placeholder*="${placeholder}"]`);
});
/**
 * Ant Design Button
 */
Cypress.Commands.add("getButton", (text: string) => {
  return cy.get("button").contains(text);
});

/**
 * SANITIZE DATABASE
 */

Cypress.Commands.add("sanitizeDatabase", (payload: TEST.IDBSanitize) => {
  if (payload.ytbUrl)
    cy.task(
      "queryDb",
      `DELETE FROM videos WHERE youtube_url LIKE '${payload.ytbUrl}'`
    );
  if (payload.userName)
    cy.task(
      "queryDb",
      `DELETE FROM users WHERE user_name LIKE '${payload.userName}'`
    );
});
