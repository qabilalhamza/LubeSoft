import VahicleObject from "../PageObjects/POSearhVahicle"
import 'cypress-wait-until';
const vahicle = new VahicleObject();

beforeEach(() => {
    Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.FnG08HaJ2wY', '.AspNetCore.Identity.Application');
    cy.intercept('**/cashier/start-invoice').as('invoice');
    cy.intercept('**/cashier/invoice-preview/details/payments').as('cash');
    cy.intercept('**/comments').as('comment');
});

describe("Login with valid Credentials", function() {
    before("Login", function() {

        cy.doLogin();

    });

    it("Search for vahicle", function() {
        cy.get(vahicle.searchField).type('8AKM153' + '{enter}');
        cy.get(vahicle.searchResult).should('have.text', 'CA-8AKM153').click();
        cy.get(vahicle.customerName).click();
    });

    it("Create Work order and add item", function() {
        cy.get(vahicle.itemSearch).type('fe');
        cy.get(vahicle.firstSearchResult).first().click();
        vahicle.saveWordOrderId();
    });

    it("Cashier a Work Order", function() {
        cy.get(vahicle.sendToCashier).click();
        cy.get(vahicle.message).should('be.visible');
        cy.wait(1000);
        cy.get(vahicle.btnClose).should('be.visible').click({
            force: true
        });
        cy.contains('Record Current Odometer').should('be.visible');
        cy.get(vahicle.fieldToday).type('100,000');
        cy.get(vahicle.btnSave).click();
        cy.wait('@comment');
        cy.wait(1000);
        cy.get(vahicle.btnCloseComment).should('be.visible').click({
            force: true
        });
    });

    it("Cashier Invoice", function() {
        cy.contains('Search Vehicle').should('be.visible');
        cy.get(vahicle.btnHome).click();
        cy.contains('LubeSoft Home').should('be.visible');
        cy.get(vahicle.cashierInvoice).click();
        vahicle.recentlyCreatedWorkOrder();
        vahicle.enterPassword();
        cy.get(vahicle.btnNext).click();
        cy.wait('@cash').then(resp => {
            vahicle.cashPayment();
        });
    });

});