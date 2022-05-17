import VehicleObject from "../PageObjects/POSearhVehicle"
import 'cypress-wait-until';
const vehicle = new VehicleObject();

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

    it("Search for vehicle", function() {
        cy.get(vehicle.searchBox).type('8AKM153' + '{enter}');
        cy.get(vehicle.searchResult).should('have.text', 'CA-8AKM153').click();
        cy.get(vehicle.searchResult).click();
    });

    it("Create Work order and add item", function() {
        cy.get(vehicle.itemSearchBox).type('fe');
        cy.get(vehicle.firstSearchResult).first().click();
        vehicle.saveWordOrderId();
    });

    it("Cashier a Work Order", function() {
        cy.get(vehicle.sendToCashierNav).click();
        cy.get(vehicle.messagePopover).should('be.visible');
        cy.wait(1000);
        cy.get(vehicle.btnClose).should('be.visible').click({
            force: true
        });
        cy.contains('Record Current Odometer').should('be.visible');
        cy.get(vehicle.fieldToday).type('101,000');
        cy.get(vehicle.btnSave).click();
        cy.wait('@comment');
        cy.wait(1000);
        cy.get(vehicle.btnCloseComment).should('be.visible').click({
            force: true
        });
    });

    it("Cashier Invoice", function() {
        cy.contains('Search Vehicle').should('be.visible');
        cy.get(vehicle.HomeNav).click();
        cy.contains('LubeSoft Home').should('be.visible');
        cy.get(vehicle.cashierInvoiceNav).click();
        vehicle.recentlyCreatedWorkOrder();
        vehicle.enterPassword();
        cy.get(vehicle.btnNext).click();
        cy.wait('@cash').then(resp => {
            vehicle.cashPayment();
        });
    });

});