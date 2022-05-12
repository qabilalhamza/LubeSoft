// ***********************************************
// This example commands.js shows you how to
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
import 'cypress-wait-until';

Cypress.Commands.add("doClick", (btn) => {
    cy.get(btn).click({force : true});
});


Cypress.Commands.add("doLogin", (userName, password) => {
    cy.visit(Cypress.config().loginCredentials.baseUrl);
    cy.get('#UserName').type(Cypress.config().loginCredentials.userName);
    cy.get('#Password').type(Cypress.config().loginCredentials.password);
    cy.get("#signInButton").click({force : true});
   

    
  //  Cypress.Cookies.preserveOnce( '.AspNetCore.Antiforgery.FnG08HaJ2wY', '.AspNetCore.Identity.Application', '')  
    
});